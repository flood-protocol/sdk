import {
	type CallParameters,
	type Address,
	type Hash,
	encodeFunctionData,
	hexToBigInt
} from "viem"
import type { FloodChain } from "../types/floodChain.js"
import {
	OrderStatus,
	type Order,
	type CancelledOrder,
	type FulfilledOrder,
	type NewOrder,
	type OrderWithStatus,
	CancelReason,
	type Item
} from "../types/order.js"
import type { AtLeastOne } from "../types/index.js"
import { floodPlainAbi } from "../constants/abi.js"
import { observe } from "./utils.js"
import { Stream } from "./stream.js"

type OrderAPIBase = {
	hash: Hash
	signature: `0x${string}`
	offerer: Address
	zone: Address
	consideration: { token: Address; amount: string }
	offer: { token: Address; amount: string }[]
	nonce: string
	deadline: string
	recipient: Address
	pre_hooks: { target: Address; data: `0x${string}` }[]
	post_hooks: { target: Address; data: `0x${string}` }[]
	created_at: string
}

type NewOrderAPI = OrderAPIBase & {
	status: "valid"
	status_metadata: {
		state: "valid"
		timestamp: number
	}
	fulfilled_at: null
	cancelled_at: null
}

type FulfilledStatusMetadata = {
	amount_out: `0x${string}`
	address: `0x${string}`
	block_hash: `0x${string}`
	block_number: number
	log_index: number
	transaction_hash: `0x${string}`
	transaction_index: number
	timestamp: number
	state: "fulfilled"
}
type FulfilledOrderAPI = OrderAPIBase & {
	status: "fulfilled"
	status_metadata: FulfilledStatusMetadata
	fulfilled_at: string
	cancelled_at: null
}

type CancelledOrderAPI = OrderAPIBase & {
	status: "cancelled"
	status_metadata: {
		state: "canceled" | "invalid_nonce" | "insufficient_balance"
	}
	fulfilled_at: null
	cancelled_at: string
}

type OrderAPI = NewOrderAPI | FulfilledOrderAPI | CancelledOrderAPI

type ListOrdersAPI = {
	orders: OrderAPI[]
	prev_cursor?: string
	next_cursor?: string
}

/**
 * Convers an order from the Flood API to an {@link OrderWithStatus}.
 * @param order An order from the Flood API.
 */
function intoOrderWithStatus(order: OrderAPI): OrderWithStatus {
	const {
		hash,
		signature,
		offerer,
		zone,
		status,
		offer: offerAPI,
		consideration: considerationAPI,
		nonce,
		deadline,
		recipient,
		pre_hooks,
		post_hooks,
		created_at
	} = order

	const consideration: Item = {
		token: considerationAPI.token,
		amount: BigInt(considerationAPI.amount)
	}
	const offer: Item[] = offerAPI.map((item) => ({
		token: item.token,
		amount: BigInt(item.amount)
	}))

	switch (status) {
		case "valid":
			return {
				hash,
				signature,
				zone,
				offerer,
				offer,
				consideration,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				recipient,
				preHooks: pre_hooks,
				postHooks: post_hooks,
				status: OrderStatus.NEW,
				createdAt: new Date(created_at)
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
				recipient,
				preHooks: pre_hooks,
				postHooks: post_hooks,
				status: OrderStatus.FULFILLED,
				transactionHash: order.status_metadata.transaction_hash,
				blockHash: order.status_metadata.block_hash,
				blockNumber: BigInt(order.status_metadata.block_number),
				transactionIndex: order.status_metadata.transaction_index,
				logIndex: order.status_metadata.log_index,
				amountOut: order.status_metadata?.amount_out
					? hexToBigInt(order.status_metadata.amount_out)
					: BigInt(order.consideration.amount),
				createdAt: new Date(created_at),
				fulfilledAt: new Date(order.fulfilled_at)
			}
		case "cancelled": {
			let cause = CancelReason.ACTION
			if (order.status_metadata.state === "invalid_nonce") {
				cause = CancelReason.INVALID_NONCE
			} else if (order.status_metadata.state === "insufficient_balance") {
				cause = CancelReason.INSUFFICIENT_BALANCE
			}
			return {
				hash,
				signature,
				zone,
				offerer,
				consideration,
				offer,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				recipient,
				preHooks: pre_hooks,
				postHooks: post_hooks,
				status: OrderStatus.CANCELLED,
				cause,
				createdAt: new Date(created_at),
				cancelledAt: new Date(order.cancelled_at)
			}
		}
		default:
			throw new Error(`Unknown order status: ${status}`)
	}
}

interface BasePaginationParams {
	limit?: number
}

interface PaginationParamsWithBeforeCursor extends BasePaginationParams {
	beforeCursor: string
	afterCursor?: never
}

interface PaginationParamsWithAfterCursor extends BasePaginationParams {
	beforeCursor?: never
	afterCursor: string
}

export type PaginationParams =
	| BasePaginationParams
	| PaginationParamsWithBeforeCursor
	| PaginationParamsWithAfterCursor

export type GetOrdersParameters = {
	/** Address of who created the order */
	offerer: Address
	pagination?: PaginationParams
}

export type GetOrdersReturnType = {
	orders: OrderWithStatus[]
	prevCursor?: string
	nextCursor?: string
}

/**
 *
 * @description
 * Fetches all orders for a given offerer.
 *
 * @param chain - {@link FloodChain} The chain to fetch orders from.
 * @param authToken - The JWT used for authentication.
 * @param offerer - {@link GetOrdersParameters} The address of the offerer listed in the orders.
 *
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const alice = "0x...";
 * const authToken = "eyJ.."; // see getAuthToken
 *
 * const orders = await getOrders(arbitrum, authToken, { offerer: alice });
 */
export async function getOrders(
	chain: FloodChain,
	authToken: string,
	{ offerer, pagination }: GetOrdersParameters
): Promise<GetOrdersReturnType> {
	const rawUrl = `${chain.floodUrl}/orders/list`
	const params: Record<string, any> = {
		address: offerer
	}

	if (pagination) {
		if (pagination.limit) {
			params.limit = pagination.limit
		}
		if ("beforeCursor" in pagination) {
			params.before_cursor = pagination.beforeCursor
		} else if ("afterCursor" in pagination) {
			params.after_cursor = pagination.afterCursor
		}
	}

	const url = new URL(rawUrl)
	url.search = new URLSearchParams(params).toString()

	const response = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${authToken}`,
			"Content-Type": "application/json"
		}
	})

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	const ordersResponse = (await response.json()) as ListOrdersAPI

	return {
		orders: ordersResponse.orders.map(intoOrderWithStatus),
		prevCursor: ordersResponse.prev_cursor,
		nextCursor: ordersResponse.next_cursor
	}
}

type OnOrder = (order: OrderWithStatus) => void
type OnNewOrder = (order: NewOrder) => void
type OnFulfilledOrder = (order: FulfilledOrder) => void
type OnCancelledOrder = (order: CancelledOrder) => void
type OnError = (error: Error) => void

export type WatchOrdersParameters = {
	offerer: `0x${string}`
	onError?: OnError
} & AtLeastOne<{
	onOrder: OnOrder
	onNew: OnNewOrder
	onFulfilled: OnFulfilledOrder
	onCancelled: OnCancelledOrder
}>

export type WatchOrdersReturnType = () => void

/**
 *
 * @description
 * Watches all orders by an offerer.
 *
 * @param chain - {@link FloodChain} The chain to watch orders on.
 * @param authToken - The JWT used for authentication.
 * @param offerer - {@link WatchOrdersParameters} The address of the offerer listed in the orders.
 * @param params - {@link WatchOrdersParameters} At least one of `onOrder`, `onNew`, `onFulfilled`, `onCancelled` must be provided.
 *
 * @returns A function to call to stop watching orders.
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const alice = "0x...";
 * const authToken = "eyJ.."; // see getAuthauthToken
 *
 * const updates = await watchOrders(arbitrum, authToken, {
 * 	offerer: alice,
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
	authToken: string,
	{
		offerer,
		onOrder,
		onNew,
		onFulfilled,
		onCancelled,
		onError
	}: WatchOrdersParameters
): Promise<WatchOrdersReturnType> {
	return observe(
		`watchOrders-${offerer}`,
		{ onOrder, onNew, onFulfilled, onCancelled, onError },
		async (emit) => {
			const controller = new AbortController()
			const response = await fetch(
				`${chain.floodUrl}/orders/stream?address=${offerer.toLowerCase()}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${authToken}`,
						"Content-Type": "text/event-stream",
						"Cache-Control": "no-store"
					},
					signal: controller.signal
				}
			)
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`)
			}
			const stream = Stream.fromSSEResponse<OrderAPI>(response, controller)
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

/**
 * @description
 * Generates eth_call params to verify if an order adheres to the trading rules of the order zone, if the nonce is unspent, and if the deadline has not been exceeded.
 * @param order {@link Order}
 * @return Ethereum call parameters to validate an order.
 *
 * @example
 *
 * import { isOrderValidCall } from "flood-sdk"
 *
 * const client = createPublicClient();
 * const isValid = await client.call(isValidOrder(arbitrum, { order }))
 */
export function isValidOrderCall(
	chain: FloodChain,
	order: Order
): CallParameters {
	return {
		to: chain.contracts.floodPlain.address,
		data: encodeFunctionData({
			abi: floodPlainAbi,
			functionName: "getOrderStatus",
			args: [order]
		})
	}
}
