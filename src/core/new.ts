import {
  hashTypedData,
  stringify,
  maxUint256,
  encodeFunctionData,
  type CallParameters,
  type Address,
  type Hash,
} from "viem";
import { permit2WitnessTypes, PrimaryType } from "../constants/types.js";
import type { Order } from "../types/order.js";
import { permit2Domain } from "./permit2.js";
import type { FloodChain } from "../types/floodChain.js";
import type { QuoteParameters } from "./quote.js";
import { bookAbi } from "../constants/abi.js";

export type NewOrderParameters = Omit<Order, "offer" | "consideration"> &
  Partial<Pick<Order, "deadline" | "zone">> &
  QuoteParameters & { minAmountOut: bigint };
/**
 * Creates a new order Flood order. This can then be signed and submitted to the Flood API.
 * @default `zone` to the main Flood zone, `deadline` to maxUint256 (order does not expire).
 * @param chain - Chain for the order.
 * @param params - {@link NewOrderParameters}
 *
 * @example
 * import {arbitrum} from "flood-sdk/chains";
 *
 * // Simple order
 * const simpleOrder = newOrder(arbitrum, {
 *      offerer: "0x...",
 *      offer: [{ token: "0x...", amount: 100000000n }],
 *      consideration: [{ token: "0x...", amount: 100000000n }],
 *      nonce: 0n
 * });
 *
 * // Order with custom zone
 * const customZoneOrder = newOrder(arbitrum, {
 *      ...simpleOrder,
 * 	    zone: "0x..."
 * });
 *
 * // Order with custom deadline (1 week from now)
 * const oneWeekFromNow = Math.floor((new Date().getTime() + 7 * 24 * 60 * 60 * 1000) / 1000);
 * const customDeadlineOrder = newOrder(arbitrum, {
 *      ...simpleOrder,
 * 	    deadline: BigInt(oneWeekFromNow)
 * });
 */
export function newOrder(
  chain: FloodChain,
  {
    tokensIn,
    tokenOut,
    minAmountOut,
    offerer,
    zone = chain.contracts.defaultZone.address,
    recipient,
    preHooks,
    postHooks,
    deadline = maxUint256,
    nonce,
  }: NewOrderParameters
): Order {
  return {
    offerer,
    recipient,
    preHooks,
    postHooks,
    zone,
    offer: Object.entries(tokensIn).map(([token, amount]) => ({
      token: token as Address,
      amount,
    })),
    consideration: { token: tokenOut, amount: minAmountOut },
    deadline: deadline,
    nonce,
  };
}

/**
 * @description
 * Generates the message hash to sign for submitting an order. This is done by signing a `PermitBatchWitnessTransferFrom` message.
 *
 * @param chain Chain the order is on.
 * @param order The order to sign.
 * @returns The message hash to sign.
 *
 * @example
 * import {arbitrum} from "flood-sdk/chains";
 *
 * const order = newOrder(arbitrum, {
 *      offerer: "0x...",
 *      zone: "0x...",
 *      offer: [
 *         { token: "0x...", amount: 100000000n }
 *      ],
 *      consideration: [
 *          { token: "0x...", amount: 100000000n }
 *      ],
 *     deadline: 100000000n,
 *     nonce: 0n
 * })
 * const orderHash = orderHash(arbitrum, order)
 */
export function orderHash(chain: FloodChain, order: Order): Hash {
  const permit = {
    permitted: order.offer,
    spender: chain.contracts.book.address,
    nonce: order.nonce,
    deadline: order.deadline,
    witness: order,
  };
  return hashTypedData({
    domain: permit2Domain(chain),
    types: permit2WitnessTypes,
    primaryType: PrimaryType.NEW,
    message: permit,
  });
}

export type SubmitOrderParameters = {
  order: Order;
  signature: `0x${string}`;
};

/**
 * @description
 * Broadcasts an order to the Flood protocol.
 * @param params {@link SubmitOrderParameters}
 *
 * @example
 * import {arbitrum} from "flood-sdk/chains";
 *
 * submitOrder(arbitrum, {
 *      order,
 *      signature
 * }).then(() => console.log("Order submitted successfully"))
 */
export async function submitOrder(
  chain: FloodChain,
  { order, signature }: SubmitOrderParameters
): Promise<void> {
  const response = await fetch(`${chain.floodUrl}/orders/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: stringify({ order, signature }),
  });

  if (response.status !== 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
}

/**
 * Creates transaction parameters for etching an order, that is, submitting it publicly on-chain.
 * To submit orders, in most cases you want `submitOrder` instead of this, as it requires no transaction.
 *
 * @param chain - {@link FloodChain}
 * @param params - {@link SubmitOrderParameters}
 * @returns The transaction parameters. It is up to the caller to then send the transaction with its client of choice.
 * @example
 * import {arbitrum} from "flood-sdk/chains";
 * let tx = etchOrderTransaction(arbitrum, { order, signature });
 * walletClient.sendTransaction({...tx, from: "0x.."})
 */
export function etchOrderTransaction(
  chain: FloodChain,
  params: SubmitOrderParameters
): CallParameters {
  return {
    to: chain.contracts.book.address,
    data: encodeFunctionData({
      abi: bookAbi,
      functionName: "etchOrder",
      args: [params],
    }),
  };
}
