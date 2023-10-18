export type Item = {
	token: `0x${string}`
	amount: bigint
}
export type Order = {
	offerer: `0x${string}`
	zone: `0x${string}`
	offer: Item[]
	consideration: Item[]
	nonce: bigint
	deadline: bigint
}

export enum OrderStatus {
	/** Order is new and can be filled */
	NEW = "new",
	/** Order has been fulfilled */
	FULFILLED = "fulfilled",
	/** Order has been cancelled */
	CANCELLED = "cancelled"
}

type OrderWithSignatureAndHash = Order & {
	hash: `0x${string}`
	signature: `0x${string}`
}

export type NewOrder = OrderWithSignatureAndHash & {
	status: OrderStatus.NEW
}

export type FulfilledOrder = OrderWithSignatureAndHash & {
	status: OrderStatus.FULFILLED
	txHash: `0x${string}`
	amountOut: bigint
}

export enum CancelReason {
	/** The offerer willingly canceled the order */
	ACTION = "action",
	/** The nonce was invalid. This means the order was delete on-chain */
	INVALID_NONCE = "invalid-nonce",
	/** The offerer had less balance than the order offer */
	INSUFFICIENT_BALANCE = "insufficient-balance"
}

export type CancelledOrder = OrderWithSignatureAndHash & {
	status: OrderStatus.CANCELLED
	cause: CancelReason
}

export type OrderWithStatus = NewOrder | FulfilledOrder | CancelledOrder
