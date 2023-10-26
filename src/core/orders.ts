import {
	type CallParameters,
	type Address,
	type Hash,
	encodeFunctionData
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
import { bookAbi } from "../constants/abi.js"
import { observe } from "./utils.js"
import { Stream } from "./stream.js"

type OrderAPIBase = {
	hash: Hash
	offerer: Address
	zone: Address
	consideration: { token: Address; amount: string }[]
	offer: { token: Address; amount: string }[]
	nonce: string
	deadline: string
	signature: `0x${string}`
	created_at: string
}

type NewOrderAPI = OrderAPIBase & {
	status: OrderStatus.NEW, 
	status_metadata: {
		state: "valid"
		timestamp: number
	}
	fulfilled_at: null
	cancelled_at: null
}

type FulfilledStatusMetadata = {
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
	status: OrderStatus.FULFILLED, 
	status_metadata: FulfilledStatusMetadata
	fulfilled_at: string
	cancelled_at: null
}

type CancelledOrderAPI = OrderAPIBase & {
	status: OrderStatus.CANCELLED, 
	status_metadata: {
		state: "canceled" | "invalid_nonce" | "insufficient_balance"
	}
	fulfilled_at: null
	cancelled_at: string
}

type OrderAPI = NewOrderAPI | FulfilledOrderAPI | CancelledOrderAPI

/**
 * Convers an order from the Flood API to an {@link OrderWithStatus}.
 * @param order An order from the Flood API.
 */
function intoOrderWithStatus(order: OrderAPI): OrderWithStatus {
	const {
		hash,
		offerer,
		zone,
		status,
		offer: offerAPI,
		consideration: considerationAPI,
		nonce,
		deadline,
		signature,
		created_at
	} = order

	const consideration: Item[] = considerationAPI.map((item) => ({
		token: item.token,
		amount: BigInt(item.amount)
	}))
	const offer: Item[] = offerAPI.map((item) => ({
		token: item.token,
		amount: BigInt(item.amount)
	}))

	switch (status) {
		case OrderStatus.NEW:
			return {
				hash,
				signature,
				zone,
				offerer,
				offer,
				consideration,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				status,
				createdAt: new Date(created_at)
			}
		case OrderStatus.FULFILLED:
			return {
				hash,
				signature,
				zone,
				offerer,
				consideration,
				offer,
				nonce: BigInt(nonce),
				deadline: BigInt(deadline),
				status,
				transactionHash: order.status_metadata.transaction_hash,
				blockHash: order.status_metadata.block_hash,
				blockNumber: BigInt(order.status_metadata.block_number),
				transactionIndex: order.status_metadata.transaction_index,
				logIndex: order.status_metadata.log_index,
				amountOut: 0n,
				createdAt: new Date(created_at),
				fulfilledAt: new Date(order.fulfilled_at)
			}
		case OrderStatus.CANCELLED:
			let cause = CancelReason.ACTION;
			if(order.status_metadata.state === "invalid_nonce") {
				cause = CancelReason.INVALID_NONCE;
			} else if(order.status_metadata.state === "insufficient_balance") {
				cause = CancelReason.INSUFFICIENT_BALANCE;
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
				status,
				cause, 
				createdAt: new Date(created_at),
				cancelledAt: new Date(order.cancelled_at)
			}
		default:
			throw new Error(`Unknown order status: ${status}`)
	}
}

export type GetOrdersParameters = {
	/** Address of who created the order */
	offerer: Address
}

export type GetOrdersReturnType = OrderWithStatus[]

/**
 *
 * @description
 * Fetches all orders for a given offerer.
 *
 * @param chain - {@link FloodChain} The chain to fetch orders from.
 * @param params - {@link GetOrdersParameters} The address of the offerer listed in the orders.
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
	{ offerer }: GetOrdersParameters
): Promise<GetOrdersReturnType> {
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
	const orders = (await response.json()) as OrderAPI[]

	return orders.map(intoOrderWithStatus)
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
						"Content-Type": "text/event-stream",
						"Cache-Control": "no-store"
					},
					signal: controller.signal
				}
			)
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`)
			}
			const stream = Stream.fromSSEResponse<OrderAPI>(
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
		to: chain.contracts.book.address,
		data: encodeFunctionData({
			abi: bookAbi,
			functionName: "getOrderStatus",
			args: [order]
		})
	}
}
