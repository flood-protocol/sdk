import { type Address, type Hash, stringify } from "viem";
import { type FloodChain } from "../types";

/**
 *
 * @description
 * Fetches the current nonce for EIP-4361 Sign-In with Ethereum authentication.
 *
 * @param chain - {@link FloodChain} The chain to authenticate for.
 * @returns The current SIWE nonce.
 *
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const nonce = await getAuthNonce(arbitrum);
 */
export async function getAuthNonce(
	chain: FloodChain,
): Promise<string> {
	const url = `${chain.floodUrl}/auth/nonce`

	const response = await fetch(url, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	const authNonce = await response.text();

	return authNonce;
}

export type UserAuthScope = {
	type: "user",
}

export type ZoneAuthScope = {
	type: "zone",
	zoneAddress: Address,
}

export type AuthScope = UserAuthScope | ZoneAuthScope;

export type GetAuthMessageParameters = {
	scope: AuthScope,
	signerAddress: Address,
};

export type GetAuthMessageReturnType = string;

/**
 *
 * @description
 * Generates an EIP-4361 Sign-In with Ethereum message to sign for authentication.
 *
 * @param chain - {@link FloodChain} The chain to authenticate for.
 * @param scope - {@link AuthScope} The authentication scope (with any required parameters).
 * @param signerAddress - The signer address, representing the account requesting authentication.
 * @returns The structured plaintext message to sign with the EIP-191 signature scheme.
 *
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const alice = "0x..."
 *
 * const userAuthMessage = await getAuthMessage(arbitrum, {
 * 	scope: {
 * 		type: "user"
 * 	},
 * 	signerAddress: alice
 * });
 *
 * const zoneAuthMessage = await getAuthMessage(arbitrum, {
 * 	scope: {
 * 		type: "zone",
 * 		zoneAddress: "0x..."
 * 	},
 * 	signerAddress: alice
 * });
 */
export async function getAuthMessage(
	chain: FloodChain,
	{ scope, signerAddress }: GetAuthMessageParameters
): Promise<GetAuthMessageReturnType> {
	const url = `${chain.floodUrl}/auth/message`

	let scopeParam = (() => {
		switch(scope.type) {
			case "zone":
				return {
					type: "zone",
					zone_address: scope.zoneAddress
				}
			default:
				return scope
		}
	})();

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: stringify({
			scope: scopeParam,
			signer_address: signerAddress
		}),
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	const authMessage = await response.text();

	return authMessage;
}

export type GetAuthTokenParameters = {
	message: string,
	signature: Hash,
};

export type GetAuthTokenReturnType = string;

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
 * const authToken = await getAuthToken(arbitrum, {
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
	const authToken = await response.text();

	return authToken;
}

export type GetAuthInfoReturnType = {
	address: Address,
	chain_id: number,
};

/**
 *
 * @description
 * Fetches authentication information from the provided JSON Web Token.
 *
 * @param chain - {@link FloodChain} The chain to authenticate for.
 * @param authToken - The JWT used for authentication.
 * @returns authentication information.
 *
 * @example
 * import {arbitrum} from "flood-sdk/arbitrum";
 *
 * const authInfo = await getAuthInfo(arbitrum, authToken);
 */
export async function getAuthInfo(
	chain: FloodChain,
	authToken: string
): Promise<GetAuthInfoReturnType> {
	const url = `${chain.floodUrl}/auth/info`

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${authToken}`
		}
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	const authInfo = await response.json();

	return authInfo as GetAuthInfoReturnType;
}
