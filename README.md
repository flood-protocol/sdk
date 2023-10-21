# Flood SDK

This SDK offers a collection of robustly typed core functions for interfacing with the Flood protocol. It is designed to accommodate the most frequently encountered use-cases when utilizing the protocol.

The library is in active development and in its infancy, so don't consider it stable yet.

In development:

- [x] Support for invalidating Permit2 nonces
- [x] Support for onchain trading
- [ ] Comprehensive examples

## Getting started

To install run:

```
npm install flood-sdk viem
```

```
yarn install flood-sdk viem
```

```
bun add flood-sdk viem
```

## Getting quotes

To get a quote for a basket of tokens:

```javascript
import { arbitrum } from "flood-sdk/chains"
import { quote } from "flood-sdk"

const amountOut = await quote(arbitrum, {
    tokensIn: {
        // USDC address
        "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8": 10000000n
        // USDT address
        "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": 10000000n
        // ... other tokens
    },
    // WETH address
    tokenOut: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
});
```

## Creating and submitting orders

This SDK provides utilities for creating, signing and submitting orders. Flood runs entirely on signatures and uses [Permit2](https://github.com/Uniswap/permit2/tree/main) for verifying signatures and transfering assets.

```javascript
import {arbitrum} from "flood-sdk/chains";
import {newOrder, orderHash, permit2Domain, permit2WitnessTypes, NewOrderPrimaryType, permitFromOrder} from "flood-sdk";

const order = newOrder(arbitrum, {
  offerer: "0x...", // The address of the trader. It must be the signer of the order or a smart contract implementing ERC1271
  zone: arbitrum.contracts.defaultZone.address, // The zone address. The zone is a contract setting trading rules. We recommend starting with the Flood default zone.
  // The basket of tokens to sell.
  tokensIn: {
    "0x...": 1000000n
  },
  tokenOut: "...",  // The token to buy
  minAmountOut: 99999999n // The minimum the offerer is willing to receive. Setting this too high will effectively turn the order into a limit order.
  deadline: 100000000n, // The UNIX timestamp after which the order will expire.
  nonce: nextNonce(arbitrum, { offerer: "0x..." }), // The permit2 nonce for the order. We use the nextNonce function to easily find the next available nonce.
});

// This is the message to sign. Note that this includes everything including the domain separator and 0x1901. So nothing should be added to it.
const orderHash = orderHash(arbitrum, order);

// Alternatively, you can import the domain, types and new order type to sign with your favorite library, here is an example with viem
const signature = await viemWalletClient.signTypedData({domain: permit2Domain(arbitrum), types: permit2WitnessTypes, message: permitFromOrder(order), primaryType: NewOrderPrimaryType});


submitOrder(arbitrum, {order, signature}).then(() => console.log("order sent"))
```

For an overview of which structs are signed, and how to craft the structs and signatures on your own, [here](https://github.com/flood-protocol/flood-contracts/tree/master/src/flood-plain) is a full reference on how to interact with the protocol contracts

## Canceling Orders

Similar to submitting orders, canceling orders involve signing messages and structs.
Supposing you already have an order:

```javascript
import {
  cancelOrder,
  cancelOrderHash,
  CancelOrderPrimaryType,
} from "flood-sdk";

const order = {
  // ... your order
};

// This is the message to sign. Note that this includes everything including the domain separator and 0x1901. So nothing should be added to it.
const cancelOrderHash = cancelOrderHash(arbitrum, order);

// Alternatively, you can import the domain, types and new order type to sign with your favorite library, here is an example with viem
const signature = await viemWalletClient.signTypedData({
  domain: permit2Domain(arbitrum),
  types: permit2WitnessTypes,
  message: permitFromOrder(order),
  primaryType: CancelOrderPrimaryType,
});

cancelOrder(arbitrum, { order, signature }).then(() =>
  console.log("Order cancelled")
);
```

Please be aware that canceling an order simply removes it from the Flood offchain orderbook. This does not provide a trustless guarantee that the order cannot be filled.
In the rare case in which you want to make the order completely unfillable, you'd need to invalidate the Permit2 nonce.
We are currently working on supporting this in the SDK.

## Fetching orders

This will fetch all orders submitted, cancelled and filled from an address.
The order will have additional metadata on it, like wether its has been filled, canceled or its still valid (pending).

```javascript
import { getOrders, arbitrum } from "flood-sdk";

const address = "0x..."; // Your address

getOrders(arbitrum, address)
  .then((orders) => console.log(orders))
  .catch((error) => console.error(error));
```

## Streaming Orders

The SDK provides a way to watch for orders of an offerer using Server-Sent Events (SSE). Here's an example:

```javascript
import { watchOrders } from "flood-sdk";

const unwatch = await watchOrders(arbitrum, offerer, {
  onOrder: (order) => {
    console.log(order);
  },
});
// To stop streaming orders
unwatch();
```

At least one callback between `onOrder`, `onNew`, `onFulfilled` and `onCancel` must be present.
