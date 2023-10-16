import { type FloodChainContracts } from "./floodContracts.js"

export type FloodEndpoint = `${string}.flood.bid`
/** Defines an endpoint and a set of contracts for a chain supported by Flood. */
export type FloodChain = {
	floodUrl: FloodEndpoint
	contracts: FloodChainContracts
}
