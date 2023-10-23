import type {Address} from "viem";
import type {FloodChain} from "../types/floodChain.js";

export type GetTokensReturnType = Address[]

/**
 *
 * @description
 * Fetches all tokens supported by the Flood Fulfiller.
 *
 * @param chain - {@link FloodChain} The chain to fetch orders from.
 *
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const tokens = await getTokens(arbitrum);
 */
export async function getTokens(
	chain: FloodChain
): Promise<GetTokensReturnType> {
	const url = `${chain.floodUrl}/tokens`

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	const {tokens} = (await response.json()) as {tokens: Address[]}

	return tokens
}
