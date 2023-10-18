import type { FloodChain } from "../types/floodChain.js"
import {
	OrderStatus,
	type CancelledOrder,
	type FulfilledOrder,
	type NewOrder,
	type OrderWithStatus,
	CancelReason
} from "../types/order.js"
import { observe } from "./utils.js"
import type { AtLeastOne } from "../types/index.js"
import { Stream } from "./stream.js"

type OrderAPIStatus =
	| "invalid-nonce"
	| "insufficient-balance"
	| "cancelled"
	| "new"
	| "fulfilled"
	| "cancelled"
type OrderAPIResponse = {
	hash: `0x${string}`
	status: OrderAPIStatus
	offerer: `0x${string}`
	zone: `0x${string}`
	consideration_tokens: [`0x${string}`]
	consideration_amounts: [string]
	offer_tokens: [`0x${string}`]
	offer_amounts: [string]
	nonce: string
	deadline: string
	signature: `0x${string}`
}

/**
 * Convers an order from the Flood API to an {@link OrderWithStatus}.
 * @param order An order from the Flood API.
 */
function intoOrderWithStatus(order: OrderAPIResponse): OrderWithStatus {
	const {
		hash,
		offerer,
		zone,
		status,
		consideration_tokens,
		consideration_amounts,
		offer_tokens,
		offer_amounts,
		nonce,
		deadline,
		signature
	} = order
	const consideration = consideration_tokens.map((token, i) => ({
		token,
		amount: BigInt(consideration_amounts[i])
	}))
	const offer = offer_tokens.map((token, i) => ({
		token,
		amount: BigInt(offer_amounts[i])
	}))
	switch (status) {
		case "new":
			return {
				hash,
				signature,
				zone,
				offerer,
				consideration,
				offer,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				status: OrderStatus.NEW
			}
		case "fulfilled":
			return {
				hash,
				signature,
				zone,
				offerer,
				consideration,
				offer,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				status: OrderStatus.FULFILLED,
				txHash: "0x",
				amountOut: 0n
			}
		case "cancelled":
			return {
				hash,
				signature,
				zone,
				offerer,
				consideration,
				offer,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				status: OrderStatus.CANCELLED,
				cause: CancelReason.ACTION
			}
		case "invalid-nonce":
			return {
				hash,
				signature,
				zone,
				offerer,
				consideration,
				offer,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				status: OrderStatus.CANCELLED,
				cause: CancelReason.INVALID_NONCE
			}
		case "insufficient-balance":
			return {
				hash,
				signature,
				zone,
				offerer,
				consideration,
				offer,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				status: OrderStatus.CANCELLED,
				cause: CancelReason.INSUFFICIENT_BALANCE
			}
		default:
			throw new Error(`Unknown order status: ${status}`)
	}
}

/**
 *
 * @description
 * Fetches all orders for a given offerer.
 *
 * @param chain - {@link FloodChain} The chain to fetch orders from.
 * @param offerer - The address of the offerer listed in the orders.
 *
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const alice = "0x..."
 *
 * const orders = await getOrders(arbitrum, alice);
 */
export async function getOrders(
	chain: FloodChain,
	offerer: `0x${string}`
): Promise<OrderWithStatus[]> {
	const url = `${chain.floodUrl}/orders/list?address=${offerer}`

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	const orders = (await response.json()) as OrderAPIResponse[]

	return orders.map(intoOrderWithStatus)
}

type OnOrder = (order: OrderWithStatus) => void
type OnNewOrder = (order: NewOrder) => void
type OnFulfilledOrder = (order: FulfilledOrder) => void
type OnCancelledOrder = (order: CancelledOrder) => void
type OnError = (error: Error) => void

export type WatchOrdersParameters = {
	onError?: OnError
} & AtLeastOne<{
	onOrder: OnOrder
	onNew: OnNewOrder
	onFulfilled: OnFulfilledOrder
	onCancelled: OnCancelledOrder
}>

/**
 *
 * @description
 * Watches all orders by an offerer.
 *
 * @param chain - {@link FloodChain} The chain to watch orders on.
 * @param offerer - The address of the offerer listed in the orders.
 * @param params - {@link WatchOrdersParameters} At least one of `onOrder`, `onNew`, `onFulfilled`, `onCancelled` must be provided.
 *
 * @returns A function to call to stop watching orders.
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const alice = "0x..."
 *
 * const updates = await watchOrders(arbitrum, alice, {
 * 	onOrder: (order) => console.log(order),
 * 	onNew: (order) => console.log(order),
 * 	onFulfilled: (order) => console.log(order),
 * 	onCancelled: (order) => console.log(order),
 * 	onError: (error) => console.log(error)
 * });
 *
 */
export async function watchOrders(
	chain: FloodChain,
	offerer: `0x${string}`,
	{ onOrder, onNew, onFulfilled, onCancelled, onError }: WatchOrdersParameters
): Promise<() => void> {
	return observe(
		`watchOrders-${offerer}`,
		{ onOrder, onNew, onFulfilled, onCancelled, onError },
		async (emit) => {
			const controller = new AbortController()
			const response = await fetch(
				`${chain.floodUrl}/orders/stream?offerer=${offerer}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "text/event-stream",
						"Cache-Control": "no-store"
					},
					signal: controller.signal
				}
			)
			const stream = Stream.fromSSEResponse<OrderAPIResponse>(
				response,
				controller
			)
			for await (const orderFromAPI of stream) {
				const order = intoOrderWithStatus(orderFromAPI)
				if (emit.onOrder) {
					emit.onOrder(order)
				}
				switch (order.status) {
					case OrderStatus.NEW:
						emit.onNew?.(order)
						break
					case OrderStatus.FULFILLED:
						emit.onFulfilled?.(order)
						break
					case OrderStatus.CANCELLED:
						emit.onCancelled?.(order)
						break
					default:
						throw new Error("Unknown order status")
				}
			}
			return () => {
				controller.abort()
			}
		}
	)
}
