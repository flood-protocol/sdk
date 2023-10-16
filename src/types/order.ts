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
