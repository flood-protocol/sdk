import { hashTypedData, stringify } from "viem/utils"
import { permit2WitnessTypes, NewOrderPrimaryType } from "../constants/types.js"
import type { Order } from "../types/order.js"
import { permit2Domain } from "./permit2.js"
import type { FloodChain } from "../types/floodChain.js"

export type NewOrderParameters = {
	tokensIn: Record<`0x${string}`, bigint>
	tokenOut: `0x${string}`
	minAmountOut: bigint
	deadline: bigint
} & Pick<Order, "offerer" | "zone" | "nonce">

/**
 * @description
 * Generates a new order to be signed and submitted to the Flood API.
 * If not set, `zone` defaults to the default Flood zone.
 * @param chain Chain the order is on.
 * @param params {@link NewOrderParameters}
 *
 * @example
 * import {arbitrum} from "flood-sdk/chains";
 *
 * const order = newOrder(arbitrum, {
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
export function newOrder(
	chain: FloodChain,
	{
		tokensIn,
		tokenOut,
		minAmountOut,
		offerer,
		zone = chain.contracts.defaultZone.address,
		deadline,
		nonce
	}: NewOrderParameters
): Order {
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
 * @param chain Chain the order is on.
 * @param order The order to sign.
 * @returns The message hash to sign.
 *
 * @example
 * import {arbitrum} from "flood-sdk/chains";
 *
 * const order = newOrder(arbitrum, {
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
export function orderHash(chain: FloodChain, order: Order): `0x${string}` {
	const permit = {
		permitted: order.offer,
		spender: chain.contracts.book.address,
		nonce: order.nonce,
		deadline: order.deadline,
		witness: order
	}
	return hashTypedData({
		domain: permit2Domain(chain),
		types: permit2WitnessTypes,
		primaryType: NewOrderPrimaryType,
		message: permit
	})
}

export type SubmitOrderParameters = {
	order: Order
	signature: `0x${string}`
}

/**
 * @description
 * Broadcasts an order to the Flood protocol.
 * @param params {@link SubmitOrderParameters}
 *
 * @example
 * submitOrder(chain, {
 *      order,
 *      signature
 * }).then(() => console.log("Order submitted successfully"))
 */
export async function submitOrder(
	chain: FloodChain,
	args: SubmitOrderParameters
): Promise<void> {
	const response = await fetch(`${chain.floodUrl}/orders/new`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: stringify({ order: args.order, signature: args.signature })
	})

	if (response.status !== 200) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
}
