export const permit2WitnessTypes = {
	PermitBatchWitnessTransferFrom: [
		{ name: "permitted", type: "TokenPermissions[]" },
		{ name: "spender", type: "address" },
		{ name: "nonce", type: "uint256" },
		{ name: "deadline", type: "uint256" },
		{ name: "witness", type: "Order" }
	],
	TokenPermissions: [
		{ name: "token", type: "address" },
		{ name: "amount", type: "uint256" }
	],
	Item: [
		{ name: "token", type: "address" },
		{ name: "amount", type: "uint256" }
	],
	Order: [
		{ name: "offerer", type: "address" },
		{ name: "zone", type: "address" },
		{ name: "offer", type: "Item[]" },
		{ name: "consideration", type: "Item[]" },
		{ name: "deadline", type: "uint256" },
		{ name: "nonce", type: "uint256" }
	]
} as const

export enum PrimaryType {
	NEW = "PermitBatchWitnessTransferFrom",
	CANCEL = "Order"
}
