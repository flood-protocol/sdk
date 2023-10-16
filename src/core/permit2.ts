import type { TypedDataDomain } from "viem"
import { permit2Address } from "../constants/address.js"

/**
 *
 * @param chainId
 * @returns The Permit2 domain for the given chain.
 */
export function permit2Domain(
	chainId: number,
	address: `0x${string}` = permit2Address
): TypedDataDomain {
	return {
		name: "Permit2",
		chainId,
		verifyingContract: address
	}
}
