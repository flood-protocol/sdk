import { domainSeparator, encodeFunctionData } from "viem"
import type { Address, Hash, TypedDataDomain, CallParameters } from "viem"
import type { FloodChain } from "../types/floodChain.js"
import type { Order } from "../types/order.js"
import type { Permit } from "../types/permit.js"
import { permit2NonceFinderAbi } from "../constants/abi.js"
import { permit2NonceFinderAddress } from "../constants/address.js"

/**
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

/**
 * @param chain - {@link FloodChain}
 * @returns The Permit2 Domain separator for the given chain
 */
export function permit2DomainSeparator(chain: FloodChain): Hash {
	return domainSeparator({ domain: permit2Domain(chain) })
}

export type NextNonceCallParameters = {
	offerer: Address
	/** An offset to start looking for the next nonce. This is useful if you have signed another order, but it has not been fulfilled yet.*/
	offset?: bigint
}

/**
 * @description
 * Encodes a call to fetch the next available nonce after an offset (defaults to 0)
 * @param params {@link NextNonceParameters}
 * @returns callParams - The calldata and `to` field to use for an eth_call returning the next nonce.
 *
 * @example
 *
 * import { nextNonceCall } from "flood-sdk"
 *
 * const client = createPublicClient();
 * const nextNonce = await client.call(nextNonceCall({offerer: "0x...", offset: 2n}))
 */
export function nextNonceCall({
	offerer,
	offset = 0n
}: NextNonceCallParameters): CallParameters {
	return {
		data: encodeFunctionData({
			abi: permit2NonceFinderAbi,
			functionName: "nextNonceAfter",
			args: [offerer, offset]
		}),
		to: permit2NonceFinderAddress
	}
}

/**
 *
 * @param chain {@link FloodChain}
 * @param order The order to create the permit from
 * @returns A permit struct, using the same deadline and nonce as the order passed in, and giving permission to the Flood book to transfer the offer items.
 */
export function intoPermit(chain: FloodChain, order: Order): Permit {
	return {
		permitted: order.offer,
		spender: chain.contracts.floodPlain.address,
		nonce: order.nonce,
		deadline: order.deadline,
		witness: order
	}
}
