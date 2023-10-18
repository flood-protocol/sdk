import EventSource from "eventsource"
import type { FloodChain } from "../types/floodChain.js"
import type { Order, OrderStatus } from "../types/order.js"
import { observe } from "./utils.js"
import type { AtLeastOne } from "../types/index.js"

type GetOrderItem = {
	orderHash: `0x${string}`
	order: Order,
    signature: `0x${string}`,
    status: OrderStatus
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
): Promise<GetOrderItem[]> {
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
	const orders = await response.json() as GetOrderItem[]

	return orders
}

type OnOrder = (order: GetOrderItem) => void
type OnNewOrder = (order: GetOrderItem) => void
type OnFulfilledOrder = (order: GetOrderItem) => void
type OnCancelledOrder = (order: GetOrderItem) => void
type OnError = (error: Error) => void



type WatchOrdersParams = {
	onError?: OnError 
} & AtLeastOne<{
	onOrder: OnOrder
	onNew: OnNewOrder
	onFulfilled: OnFulfilledOrder
	onCancelled: OnCancelledOrder
}>;

/**
 *
 * @description
 * Watches all orders by an offerer.
 *
 * @param chain - {@link FloodChain} The chain to watch orders on.
 * @param offerer - The address of the offerer listed in the orders.
 * @param params - {@link WatchOrdersParams} At least one of `onOrder`, `onNew`, `onFulfilled`, `onCancelled` must be provided.
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
	{onOrder, onNew, onFulfilled, onCancelled, onError}: WatchOrdersParams
  ): Promise<() => void> {
	return observe(`watchOrders-${offerer}`, { onOrder, onNew, onFulfilled, onCancelled, onError }, (emit) => {
	  const source = new EventSource(`${chain.floodUrl}/orders/stream?offerer=${offerer}`);
	  
	  source.onmessage = (event) => {
		const newOrder: GetOrderItem = JSON.parse(event.data);
		emit.onNew?(newOrder):null;
	  };
  
	  source.onerror = (e) => {
		console.error(e);
		emit.onError?(new Error(`Error fetcthing orders`)):null;
	  };
  
	  return () => {
		source.close();
	  };
	});
  }