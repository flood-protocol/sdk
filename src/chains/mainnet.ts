import { mainnet as viemMainnet } from "./index.js"
import type { FloodChain } from "../types/floodChain.js"
import { floodChainContracts } from "../types/floodContracts.js"

export const mainnet: FloodChain = {
	...viemMainnet,
	contracts: {
		...viemMainnet.contracts,
		...floodChainContracts
	},
	floodUrl: "https://mainnet.flood.bid"
} as const satisfies FloodChain
