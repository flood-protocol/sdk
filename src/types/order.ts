import type { BlockNumber } from "viem"

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

enum Status {
	/// The order is valid.
	Valid = "valid",
	/// The order has been fulfilled.
	Fulfilled = "fulfilled",
	/// The offerer's balance is not sufficient.
	InsufficientBalance = "insufficientBalance",
	/// The order's nonce is not valid anymore.
	InvalidNonce = "invalidNonce",
	/// The order has been canceled.
	Canceled = "canceled"
}

export type OrderStatus = Status.Valid | {
			Fulfilled: Status.Fulfilled
	  }
	| {
			status: Status.InsufficientBalance
			blockNumber: BlockNumber
	  }
	| {
			status: Status.InvalidNonce
			blockNumber: BlockNumber
	  }
	| Status.Canceled
