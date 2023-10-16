import { hashTypedData } from "viem/utils"
import type { FloodEndpoint } from "../types/floodChain.js"
import type { Order } from "../types/order.js"
import { permit2Domain } from "./permit2.js"
import { permit2WitnessTypes } from "../constants/types.js"

/**
 * @description
 * Generates the message hash to sign for cancelling an order.
 *
 * @param order order to cancel
 */
export function cancelOrderHash(chainId: number, order: Order): `0x${string}` {
	return hashTypedData({
		domain: permit2Domain(chainId),
		types: permit2WitnessTypes,
		primaryType: "Order",
		message: order
	})
}

export type CancelOrderParams = {
	floodEndpoint: FloodEndpoint
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
 * @see CancelOrderParams
 *
 * @example
 * const order = {
 *   // ...some order
 * }
 *
 * // Get the correct message hash
 * const msgHash = cancelOrderHash(arbitrum.chainId, order)
 * // Sign the message hash
 * const signature = await signTypedData(msgHash)
 * cancelOrder({
 *    floodEndpoint: "https://arbitrum.flood.bid",
 *    order,
 *    signature
 * }).then(() => console.log("Order cancelled successfully")
 *
 *
 */
export async function cancelOrder(args: CancelOrderParams): Promise<void> {
	const response = await fetch(`${args.floodEndpoint}/orders/cancel`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			order: args.order,
			signature: args.signature
		})
	})

	if (response.status !== 200) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
}
