import type { Chain } from "viem"
import type { FloodChainContracts } from "./floodContracts.js"

type FloodEndpoint = `${string}.flood.bid`
/** Defines an endpoint and a set of contracts for a chain supported by Flood. */
export type FloodChain = Omit<Chain, "contracts"> & {
	floodUrl: FloodEndpoint
	contracts: FloodChainContracts & Pick<Chain, "contracts">
}
