import type { Address } from "viem"
import { stringify } from "viem"
import type { FloodChain } from "../types/floodChain.js"

export type QuoteParameters = {
	/** An object where each key-value pair is a token and the quantity of it to sell. */
	tokensIn: Record<Address, bigint>
	/** The token to receive. */
	tokenOut: Address
}

/**
 * @description Gets a quote from the Flood API.
 *
 * @param params - {@link QuoteParameters}
 *
 * @example
 * import {arbitrum} from "flood-sdk/chains";
 *
 * const amountOut = await quote(arbitrum, {
 *    tokensIn: {
 *      "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": 100000000n
 *      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": 100000000n
 *    },
 *    tokenOut: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
 * })
 * @returns The estimated amount of token out to receive.
 */
export async function quote(
	chain: FloodChain,
	args: QuoteParameters
): Promise<bigint> {
	const response = await fetch(`${chain.floodUrl}/quote`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: stringify({
			tokensIn: args.tokensIn,
			tokenOut: args.tokenOut
		})
	})

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}

	const resp = (await response.json()) as {
		amountQuote: string
	}

	return BigInt(resp.amountQuote)
}
