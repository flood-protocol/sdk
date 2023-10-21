import type { Address } from "viem"
import type { Item, Order } from "./order.js"

export type Permit = {
	permitted: Item[]
	spender: Address
	nonce: bigint
	deadline: bigint
	witness: Order
}
