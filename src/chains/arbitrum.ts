import type { FloodChain } from "../types/floodChain.js"
import { floodChainContracts } from "../types/floodContracts.js"

export const arbitrum: FloodChain = {
	contracts: {
		...floodChainContracts
	},
	floodUrl: "https://arbitrum.flood.bid"
} as const satisfies FloodChain
