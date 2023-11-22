import { Address, Hash, stringify } from "viem";
import { FloodChain } from "../types";

type UserAuthScope = {
	type: "user",
}

type ZoneAuthScope = {
	type: "zone",
	zone_address: Address,
}

type AuthScope = UserAuthScope | ZoneAuthScope;

export type GetAuthMessageParameters = {
	scope: AuthScope,
	signer_address: Address,
};

export type GetAuthMessageReturnType = String;

/**
 *
 * @description
 * Generates an EIP-4361 Sign-In with Ethereum message to sign for authentication.
 *
 * @param chain - {@link FloodChain} The chain to authenticate for.
 * @param scope - {@link AuthScope} The authentication scope (with any required parameters).
 * @param signer_address - The signer address, representing the account requesting authentication.
 * @returns The structured plaintext message to sign with the EIP-191 signature scheme.
 *
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const alice = "0x..."
 *
 * const user_auth_message = await getAuthMessage(arbitrum, {
 * 	scope: {
 * 		type: "user"
 * 	},
 * 	signer_address: alice
 * });
 *
 * const zone_auth_message = await getAuthMessage(arbitrum, {
 * 	scope: {
 * 		type: "zone",
 * 		zone_address: "0x..."
 * 	},
 * 	signer_address: alice
 * });
 */
export async function getAuthMessage(
	chain: FloodChain,
	{ scope, signer_address }: GetAuthMessageParameters
): Promise<GetAuthMessageReturnType> {
	const url = `${chain.floodUrl}/auth/message`

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: stringify({ scope, signer_address }),
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	const auth_message = await response.text();

	return auth_message;
}

export type GetAuthTokenParameters = {
	message: String,
	signature: Hash,
};

export type GetAuthTokenReturnType = String;

/**
 *
 * @description
 * Generates a JSON Web Token to use for bearer authentication.
 *
 * @param chain - {@link FloodChain} The chain to authenticate for.
 * @param message - The EIP-4361 Sign-In with Ethereum message.
 * @param signature - The EIP-191 signature of the provided message.
 * @returns The JSON Web Token to use for bearer authentication.
 *
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const auth_token = await getAuthToken(arbitrum, {
 * 	message: "flood.bid wants you to sign in with your Ethereum account:\n0x...",
 * 	signature: "0x..."
 * });
 */
export async function getAuthToken(
	chain: FloodChain,
	{ message, signature }: GetAuthTokenParameters
): Promise<GetAuthTokenReturnType> {
	const url = `${chain.floodUrl}/auth/jwt`

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: stringify({ message, signature }),
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	const auth_token = await response.text();

	return auth_token;
}
