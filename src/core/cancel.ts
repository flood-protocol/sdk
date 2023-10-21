import { type CallParameters, hashTypedData, encodeFunctionData } from "viem"
import type { FloodChain } from "../types/floodChain.js"
import type { Order } from "../types/order.js"
import { permit2Domain } from "./permit2.js"
import {
	permit2WitnessTypes,
	CancelOrderPrimaryType
} from "../constants/types.js"
import { permit2Abi } from "../constants/abi.js"

/**
 * @description
 * Generates the message hash to sign for cancelling an order.
 *
 * @param order order to cancel
 */
export function cancelOrderHash(
	chain: FloodChain,
	order: Order
): `0x${string}` {
	return hashTypedData({
		domain: permit2Domain(chain),
		types: permit2WitnessTypes,
		primaryType: CancelOrderPrimaryType,
		message: order
	})
}

export type CancelOrderParameters = {
	/** Order to cancel */
	order: Order
	/** EIP712 signature of the order to cancel.
	 * **NOTE:** The message hash is computed using `Order` as primary type, rather than `PermitBatchWitnessTransferFrom`. If in doubt, use `cancelOrderHash` to get the full hash to sign. */
	signature: `0x${string}`
}

/**
 * @description
 *  Cancels an order removing it from the off-chain order book.
 *
 * @param params {@link CancelOrderParameters}
 *
 * @example
 * import {arbitrum} from "flood-sdk/chains";
 *
 * const order = {
 *   // ...some order
 * }
 *
 * // Get the correct message hash
 * const msgHash = cancelOrderHash(arbitrum, order)
 * // Sign the message hash
 * const signature = await signTypedData(msgHash)
 * cancelOrder(arbitrum, {
 *    order,
 *    signature
 * }).then(() => console.log("Order cancelled successfully")
 *
 *
 */
export async function cancelOrder(
	chain: FloodChain,
	{ order, signature }: CancelOrderParameters
): Promise<void> {
	const response = await fetch(`${chain.floodUrl}/orders/cancel`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			...order,
			signature
		})
	})

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
}

type DeleteOrdersReturnType<T> = T extends Order
	? CallParameters
	: T extends Order[]
	? CallParameters[]
	: never

/**
 * Generates transaction parameters to invalidate an order nonce, rendering it unfillable.
 * Use {@link cancelOrder} for most cases. This function is for trustless nonce invalidation.
 *
 * @param chain - {@link FloodChain}
 * @param order - {@link Order}
 *
 * @returns Transaction parameters.
 *
 * @example
 * import { arbitrum } from "flood-sdk/chains";
 * const order = {
 * 	// some order...
 * }
 * walletClient.sendTransaction(deleteOrderTransaction(arbitrum, order))
 */
export function deleteOrderTransaction(
	chain: FloodChain,
	order: Order
): DeleteOrdersReturnType<Order> {
	const nonce = order.nonce
	const word = nonce >> 8n
	const pos = nonce & 0xffn
	const mask = 1n << pos
	return {
		to: chain.contracts.permit2.address,
		data: encodeFunctionData({
			abi: permit2Abi,
			functionName: "invalidateUnorderedNonces",
			args: [word, mask]
		})
	}
}

/**
 * @description
 * Generates transaction parameters to invalidate multiple order nonces simultaneously, rendering them unfillable.
 * This function groups all orders with nonces in the same word into a single transaction, optimizing gas usage when deleting multiple orders.
 *
 * @param chain - {@link FloodChain}
 * @param orders - Array of {@link Order}
 *
 * @returns An array of transaction parameters.
 *
 * @example
 * import { arbitrum } from "flood-sdk/chains";
 * const orders = [
 * 	// array of orders...
 * ]
 * walletClient.sendTransaction(deleteOrdersTransaction(arbitrum, orders))
 */
export function deleteOrdersTransaction(
	chain: FloodChain,
	orders: Order[]
): DeleteOrdersReturnType<Order[]> {
	const calls: CallParameters[] = []
	const masks = new Map<bigint, bigint>()

	// For each orders, finds which word it uses and XORs the invalidation mask with the existing one for that word.
	for (const order of orders) {
		const nonce = order.nonce
		const word = nonce >> 8n
		const pos = nonce & 0xffn
		const mask = 1n << pos

		// Update the mask for each word
		masks.set(word, mask | (masks.get(word) ?? 0n))
	}

	for (const wordsAndMask of masks) {
		calls.push({
			to: chain.contracts.permit2.address,
			data: encodeFunctionData({
				abi: permit2Abi,
				functionName: "invalidateUnorderedNonces",
				args: wordsAndMask
			})
		})
	}

	return calls
}
