import type { TypedDataDomain } from "viem"
import type { FloodChain } from "../types/floodChain.js"

/**
 *
 * @param chain - {@link FloodChain}
 * @returns The Permit2 domain for the given chain.
 */
export function permit2Domain(chain: FloodChain): TypedDataDomain {
	return {
		name: "Permit2",
		chainId: chain.id,
		verifyingContract: chain.contracts.permit2.address
	}
}
