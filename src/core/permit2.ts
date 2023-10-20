import { readContract } from "viem/contract"
import { domainSeparator } from "viem"
import type { Client, Address, Hash, TypedDataDomain } from "viem"
import type { FloodChain } from "../types/floodChain.js"
import type { Order, Item } from "../types/order.js"
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

export type NextNonceParameters = {
	offerer: Address
	/** The last signed nonce which hasn't been spent yet. */
	lastPendingNonce?: bigint
}

/**
 *
 * @param client Client to use for the call
 * @param params {@link NextNonceParameters}
 * @returns The next unsigned and unspent nonce.
 */
export async function nextNonce(
	client: Client,
	{ offerer, lastPendingNonce = 0n }: NextNonceParameters
): Promise<bigint> {
	const nonce = await readContract(client, {
		abi: permit2NonceFinderAbi,
		address: permit2NonceFinderAddress,
		functionName: "nextNonceAfter",
		args: [offerer, lastPendingNonce]
	})
	return nonce
}

type Permit = {
	permitted: Item[]
	spender: Address
	nonce: bigint
	deadline: bigint
	witness: Order
}
/**
 *
 * @param chain {@link FloodChain}
 * @param order The order to create the permit from
 * @returns A permit struct, using the same deadline and nonce as the order passed in, and giving permission to the Flood book to transfer the offer items.
 */
export function permitFromOrder(chain: FloodChain, order: Order): Permit {
	return {
		permitted: order.offer,
		spender: chain.contracts.book.address,
		nonce: order.nonce,
		deadline: order.deadline,
		witness: order
	}
}
