import { hashTypedData } from "viem/utils"
import { bookAddress, defaultZoneAddress } from "../constants/address.js"
import { permit2WitnessTypes } from "../constants/types.js"
import type { FloodEndpoint } from "../types/floodChain.js"
import type { Order } from "../types/order.js"
import { permit2Domain } from "./permit2.js"

export type NewOrderParams = {
	tokensIn: Record<`0x${string}`, bigint>
	tokenOut: `0x${string}`
	minAmountOut: bigint
	deadline: bigint
} & Pick<Order, "offerer" | "zone" | "nonce">

/**
 * @description
 * Generates a new order to be signed and submitted to the Flood API.
 * If not set, `zone` defaults to the default Flood zone.
 * @see NewOrderParams
 *
 * @example
 * const order = newOrder({
 *      offerer: "0x...",
 *      zone: "0x...",
 *      offer: [
 *         { token: "0x...", amount: 100000000n }
 *      ],
 *      consideration: [
 *          { token: "0x...", amount: 100000000n }
 *      ],
 *     deadline: 100000000n,
 *     nonce: 0n
 * })
 * const orderHash = orderHash(arbitrum.chainId, order)
 */
export function newOrder({
	tokensIn,
	tokenOut,
	minAmountOut,
	offerer,
	zone = defaultZoneAddress,
	deadline,
	nonce
}: NewOrderParams): Order {
	return {
		offerer,
		zone,
		offer: Object.entries(tokensIn).map(([token, amount]) => ({
			token: token as `0x${string}`,
			amount
		})),
		consideration: [{ token: tokenOut, amount: minAmountOut }],
		deadline: deadline,
		nonce
	}
}

/**
 * @description
 * Generates the message hash to sign for submitting an order. This is done by signing a `PermitBatchWitnessTransferFrom` message.
 *
 * @param chainId The chain ID of the chain the order is on.
 * @param order The order to sign.
 * @returns The message hash to sign.
 *
 * @example
 * const order = newOrder({
 *      offerer: "0x...",
 *      zone: "0x...",
 *      offer: [
 *         { token: "0x...", amount: 100000000n }
 *      ],
 *      consideration: [
 *          { token: "0x...", amount: 100000000n }
 *      ],
 *     deadline: 100000000n,
 *     nonce: 0n
 * })
 * const orderHash = orderHash(arbitrum.chainId, order)
 */
export function orderHash(chainId: number, order: Order): `0x${string}` {
	const permit = {
		permitted: order.offer,
		spender: bookAddress,
		nonce: order.nonce,
		deadline: order.deadline,
		witness: order
	}
	return hashTypedData({
		domain: permit2Domain(chainId),
		types: permit2WitnessTypes,
		primaryType: "PermitBatchWitnessTransferFrom",
		message: permit
	})
}

export type SubmitOrderParams = {
	endpoint: FloodEndpoint
	order: Order
	signature: `0x${string}`
}

/**
 * @description
 * Broadcasts an order to the Flood protocol.
 * @param args NewOrderParams
 *
 * @example
 * submitOrder({
 *      endpoint: "https://arbitrum.flood.bid",
 *      order,
 *      signature
 * }).then(() => console.log("Order submitted successfully"))
 */
export async function submitOrder(args: SubmitOrderParams): Promise<void> {
	const response = await fetch(`${args.endpoint}/orders/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(
			{ order: args.order, signature: args.signature },
			(_, v) => (typeof v === "bigint" ? v.toString() : v)
		)
	})

	if (response.status !== 200) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
}
