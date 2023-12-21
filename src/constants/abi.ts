export const permit2NonceFinderAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_permit2",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nextNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
    ],
    name: "nextNonceAfter",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "permit2",
    outputs: [
      {
        internalType: "contract ISignatureTransfer",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const permit2Abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxAmount",
        type: "uint256",
      },
    ],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "LengthMismatch",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "word",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mask",
        type: "uint256",
      },
    ],
    name: "UnorderedNonceInvalidation",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wordPos",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mask",
        type: "uint256",
      },
    ],
    name: "invalidateUnorderedNonces",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nonceBitmap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions",
            name: "permitted",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct ISignatureTransfer.PermitTransferFrom",
        name: "permit",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256",
          },
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails",
        name: "transferDetails",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "permitTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions[]",
            name: "permitted",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
        name: "permit",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256",
          },
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
        name: "transferDetails",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "permitTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions",
            name: "permitted",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct ISignatureTransfer.PermitTransferFrom",
        name: "permit",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256",
          },
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails",
        name: "transferDetails",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "witness",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "witnessTypeString",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "permitWitnessTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions[]",
            name: "permitted",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
        name: "permit",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256",
          },
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
        name: "transferDetails",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "witness",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "witnessTypeString",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "permitWitnessTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const floodPlainAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "permit2",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "fallback",
    stateMutability: "nonpayable",
  },
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "FALLBACK_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes1",
        internalType: "bytes1",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PERMIT2",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ISignatureTransfer",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addDecoder",
    inputs: [
      {
        name: "decoder",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decoders",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "etchOrder",
    inputs: [
      {
        name: "signedOrder",
        type: "tuple",
        internalType: "struct IFloodPlain.SignedOrder",
        components: [
          {
            name: "order",
            type: "tuple",
            internalType: "struct IFloodPlain.Order",
            components: [
              {
                name: "offerer",
                type: "address",
                internalType: "address",
              },
              {
                name: "zone",
                type: "address",
                internalType: "address",
              },
              {
                name: "recipient",
                type: "address",
                internalType: "address",
              },
              {
                name: "offer",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Item[]",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "consideration",
                type: "tuple",
                internalType: "struct IFloodPlain.Item",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "preHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
              {
                name: "postHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
            ],
          },
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "fulfillOrder",
    inputs: [
      {
        name: "package",
        type: "tuple",
        internalType: "struct IFloodPlain.SignedOrder",
        components: [
          {
            name: "order",
            type: "tuple",
            internalType: "struct IFloodPlain.Order",
            components: [
              {
                name: "offerer",
                type: "address",
                internalType: "address",
              },
              {
                name: "zone",
                type: "address",
                internalType: "address",
              },
              {
                name: "recipient",
                type: "address",
                internalType: "address",
              },
              {
                name: "offer",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Item[]",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "consideration",
                type: "tuple",
                internalType: "struct IFloodPlain.Item",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "preHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
              {
                name: "postHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
            ],
          },
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "fulfiller",
        type: "address",
        internalType: "address",
      },
      {
        name: "swapData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "fulfillOrder",
    inputs: [
      {
        name: "package",
        type: "tuple",
        internalType: "struct IFloodPlain.SignedOrder",
        components: [
          {
            name: "order",
            type: "tuple",
            internalType: "struct IFloodPlain.Order",
            components: [
              {
                name: "offerer",
                type: "address",
                internalType: "address",
              },
              {
                name: "zone",
                type: "address",
                internalType: "address",
              },
              {
                name: "recipient",
                type: "address",
                internalType: "address",
              },
              {
                name: "offer",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Item[]",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "consideration",
                type: "tuple",
                internalType: "struct IFloodPlain.Item",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "preHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
              {
                name: "postHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
            ],
          },
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "fulfillOrders",
    inputs: [
      {
        name: "packages",
        type: "tuple[]",
        internalType: "struct IFloodPlain.SignedOrder[]",
        components: [
          {
            name: "order",
            type: "tuple",
            internalType: "struct IFloodPlain.Order",
            components: [
              {
                name: "offerer",
                type: "address",
                internalType: "address",
              },
              {
                name: "zone",
                type: "address",
                internalType: "address",
              },
              {
                name: "recipient",
                type: "address",
                internalType: "address",
              },
              {
                name: "offer",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Item[]",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "consideration",
                type: "tuple",
                internalType: "struct IFloodPlain.Item",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "preHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
              {
                name: "postHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
            ],
          },
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "fulfiller",
        type: "address",
        internalType: "address",
      },
      {
        name: "swapData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getNonceStatus",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOrderHash",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct IFloodPlain.Order",
        components: [
          {
            name: "offerer",
            type: "address",
            internalType: "address",
          },
          {
            name: "zone",
            type: "address",
            internalType: "address",
          },
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Item[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IFloodPlain.Item",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "preHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "postHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getOrderStatus",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct IFloodPlain.Order",
        components: [
          {
            name: "offerer",
            type: "address",
            internalType: "address",
          },
          {
            name: "zone",
            type: "address",
            internalType: "address",
          },
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Item[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IFloodPlain.Item",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "preHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "postHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPermitHash",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct IFloodPlain.Order",
        components: [
          {
            name: "offerer",
            type: "address",
            internalType: "address",
          },
          {
            name: "zone",
            type: "address",
            internalType: "address",
          },
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Item[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IFloodPlain.Item",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "preHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "postHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "DecoderAdded",
    inputs: [
      {
        name: "decoderId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "decoder",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderEtched",
    inputs: [
      {
        name: "orderHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "signedOrder",
        type: "tuple",
        indexed: false,
        internalType: "struct IFloodPlain.SignedOrder",
        components: [
          {
            name: "order",
            type: "tuple",
            internalType: "struct IFloodPlain.Order",
            components: [
              {
                name: "offerer",
                type: "address",
                internalType: "address",
              },
              {
                name: "zone",
                type: "address",
                internalType: "address",
              },
              {
                name: "recipient",
                type: "address",
                internalType: "address",
              },
              {
                name: "offer",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Item[]",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "consideration",
                type: "tuple",
                internalType: "struct IFloodPlain.Item",
                components: [
                  {
                    name: "token",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "amount",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
              {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "preHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
              {
                name: "postHooks",
                type: "tuple[]",
                internalType: "struct IFloodPlain.Hook[]",
                components: [
                  {
                    name: "target",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "data",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
            ],
          },
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OrderFulfilled",
    inputs: [
      {
        name: "order",
        type: "tuple",
        indexed: false,
        internalType: "struct IFloodPlain.Order",
        components: [
          {
            name: "offerer",
            type: "address",
            internalType: "address",
          },
          {
            name: "zone",
            type: "address",
            internalType: "address",
          },
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Item[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IFloodPlain.Item",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "preHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "postHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
        ],
      },
      {
        name: "fulfiller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amountOut",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AddressInsufficientBalance",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ArrayLengthMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "DuplicateItems",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedInnerCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientAmountReceived",
    inputs: [],
  },
  {
    type: "error",
    name: "NotAContract",
    inputs: [],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ZoneDenied",
    inputs: [],
  },
] as const;

export const zoneAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "admin",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "FULFILLER_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "acceptDefaultAdminTransfer",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "authorizationFilter",
    inputs: [
      {
        name: "actor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IAuthZone.AuthFilter",
        components: [
          {
            name: "initialized",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "offerer",
            type: "tuple",
            internalType: "struct IAuthZone.AddressFilter",
            components: [
              {
                name: "value",
                type: "address",
                internalType: "address",
              },
              {
                name: "exclude",
                type: "bool",
                internalType: "bool",
              },
            ],
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IAuthZone.ItemFilter[]",
            components: [
              {
                name: "token",
                type: "tuple",
                internalType: "struct IAuthZone.AddressFilter",
                components: [
                  {
                    name: "value",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "exclude",
                    type: "bool",
                    internalType: "bool",
                  },
                ],
              },
              {
                name: "amount",
                type: "tuple",
                internalType: "struct IAuthZone.RangeFilter",
                components: [
                  {
                    name: "gte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "lte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IAuthZone.ItemFilter",
            components: [
              {
                name: "token",
                type: "tuple",
                internalType: "struct IAuthZone.AddressFilter",
                components: [
                  {
                    name: "value",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "exclude",
                    type: "bool",
                    internalType: "bool",
                  },
                ],
              },
              {
                name: "amount",
                type: "tuple",
                internalType: "struct IAuthZone.RangeFilter",
                components: [
                  {
                    name: "gte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "lte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "deadline",
            type: "tuple",
            internalType: "struct IAuthZone.RangeFilter",
            components: [
              {
                name: "gte",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "lte",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "nonce",
            type: "tuple",
            internalType: "struct IAuthZone.RangeFilter",
            components: [
              {
                name: "gte",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "lte",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "beginDefaultAdminTransfer",
    inputs: [
      {
        name: "newAdmin",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelDefaultAdminTransfer",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "changeDefaultAdminDelay",
    inputs: [
      {
        name: "newDelay",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "defaultAdmin",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "defaultAdminDelay",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "defaultAdminDelayIncreaseWait",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "fee",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IFloodPlain.Order",
        components: [
          {
            name: "offerer",
            type: "address",
            internalType: "address",
          },
          {
            name: "zone",
            type: "address",
            internalType: "address",
          },
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Item[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IFloodPlain.Item",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "preHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "postHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
        ],
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IZone.FeeInfo",
        components: [
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "bps",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "filters",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "initialized",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "offerer",
        type: "tuple",
        internalType: "struct IAuthZone.AddressFilter",
        components: [
          {
            name: "value",
            type: "address",
            internalType: "address",
          },
          {
            name: "exclude",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "consideration",
        type: "tuple",
        internalType: "struct IAuthZone.ItemFilter",
        components: [
          {
            name: "token",
            type: "tuple",
            internalType: "struct IAuthZone.AddressFilter",
            components: [
              {
                name: "value",
                type: "address",
                internalType: "address",
              },
              {
                name: "exclude",
                type: "bool",
                internalType: "bool",
              },
            ],
          },
          {
            name: "amount",
            type: "tuple",
            internalType: "struct IAuthZone.RangeFilter",
            components: [
              {
                name: "gte",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "lte",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
      {
        name: "deadline",
        type: "tuple",
        internalType: "struct IAuthZone.RangeFilter",
        components: [
          {
            name: "gte",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lte",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "nonce",
        type: "tuple",
        internalType: "struct IAuthZone.RangeFilter",
        components: [
          {
            name: "gte",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lte",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pendingDefaultAdmin",
    inputs: [],
    outputs: [
      {
        name: "newAdmin",
        type: "address",
        internalType: "address",
      },
      {
        name: "schedule",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pendingDefaultAdminDelay",
    inputs: [],
    outputs: [
      {
        name: "newDelay",
        type: "uint48",
        internalType: "uint48",
      },
      {
        name: "schedule",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rollbackDefaultAdminDelay",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAuthorizationFilter",
    inputs: [
      {
        name: "actor",
        type: "address",
        internalType: "address",
      },
      {
        name: "filter",
        type: "tuple",
        internalType: "struct IAuthZone.AuthFilter",
        components: [
          {
            name: "initialized",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "offerer",
            type: "tuple",
            internalType: "struct IAuthZone.AddressFilter",
            components: [
              {
                name: "value",
                type: "address",
                internalType: "address",
              },
              {
                name: "exclude",
                type: "bool",
                internalType: "bool",
              },
            ],
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IAuthZone.ItemFilter[]",
            components: [
              {
                name: "token",
                type: "tuple",
                internalType: "struct IAuthZone.AddressFilter",
                components: [
                  {
                    name: "value",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "exclude",
                    type: "bool",
                    internalType: "bool",
                  },
                ],
              },
              {
                name: "amount",
                type: "tuple",
                internalType: "struct IAuthZone.RangeFilter",
                components: [
                  {
                    name: "gte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "lte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IAuthZone.ItemFilter",
            components: [
              {
                name: "token",
                type: "tuple",
                internalType: "struct IAuthZone.AddressFilter",
                components: [
                  {
                    name: "value",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "exclude",
                    type: "bool",
                    internalType: "bool",
                  },
                ],
              },
              {
                name: "amount",
                type: "tuple",
                internalType: "struct IAuthZone.RangeFilter",
                components: [
                  {
                    name: "gte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "lte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "deadline",
            type: "tuple",
            internalType: "struct IAuthZone.RangeFilter",
            components: [
              {
                name: "gte",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "lte",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "nonce",
            type: "tuple",
            internalType: "struct IAuthZone.RangeFilter",
            components: [
              {
                name: "gte",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "lte",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFee",
    inputs: [
      {
        name: "newFee",
        type: "tuple",
        internalType: "struct IZone.FeeInfo",
        components: [
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "bps",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "validate",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IFloodPlain.Order",
        components: [
          {
            name: "offerer",
            type: "address",
            internalType: "address",
          },
          {
            name: "zone",
            type: "address",
            internalType: "address",
          },
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Item[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IFloodPlain.Item",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "preHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "postHooks",
            type: "tuple[]",
            internalType: "struct IFloodPlain.Hook[]",
            components: [
              {
                name: "target",
                type: "address",
                internalType: "address",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
        ],
      },
      {
        name: "fulfiller",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "DefaultAdminDelayChangeCanceled",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "DefaultAdminDelayChangeScheduled",
    inputs: [
      {
        name: "newDelay",
        type: "uint48",
        indexed: false,
        internalType: "uint48",
      },
      {
        name: "effectSchedule",
        type: "uint48",
        indexed: false,
        internalType: "uint48",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DefaultAdminTransferCanceled",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "DefaultAdminTransferScheduled",
    inputs: [
      {
        name: "newAdmin",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "acceptSchedule",
        type: "uint48",
        indexed: false,
        internalType: "uint48",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeeUpdated",
    inputs: [
      {
        name: "newFee",
        type: "tuple",
        indexed: true,
        internalType: "struct IZone.FeeInfo",
        components: [
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "bps",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FilterUpdated",
    inputs: [
      {
        name: "actor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "filter",
        type: "tuple",
        indexed: false,
        internalType: "struct IAuthZone.AuthFilter",
        components: [
          {
            name: "initialized",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "offerer",
            type: "tuple",
            internalType: "struct IAuthZone.AddressFilter",
            components: [
              {
                name: "value",
                type: "address",
                internalType: "address",
              },
              {
                name: "exclude",
                type: "bool",
                internalType: "bool",
              },
            ],
          },
          {
            name: "offer",
            type: "tuple[]",
            internalType: "struct IAuthZone.ItemFilter[]",
            components: [
              {
                name: "token",
                type: "tuple",
                internalType: "struct IAuthZone.AddressFilter",
                components: [
                  {
                    name: "value",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "exclude",
                    type: "bool",
                    internalType: "bool",
                  },
                ],
              },
              {
                name: "amount",
                type: "tuple",
                internalType: "struct IAuthZone.RangeFilter",
                components: [
                  {
                    name: "gte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "lte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "consideration",
            type: "tuple",
            internalType: "struct IAuthZone.ItemFilter",
            components: [
              {
                name: "token",
                type: "tuple",
                internalType: "struct IAuthZone.AddressFilter",
                components: [
                  {
                    name: "value",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "exclude",
                    type: "bool",
                    internalType: "bool",
                  },
                ],
              },
              {
                name: "amount",
                type: "tuple",
                internalType: "struct IAuthZone.RangeFilter",
                components: [
                  {
                    name: "gte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "lte",
                    type: "uint256",
                    internalType: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "deadline",
            type: "tuple",
            internalType: "struct IAuthZone.RangeFilter",
            components: [
              {
                name: "gte",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "lte",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "nonce",
            type: "tuple",
            internalType: "struct IAuthZone.RangeFilter",
            components: [
              {
                name: "gte",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "lte",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FulfillerUpdated",
    inputs: [
      {
        name: "fulfiller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "valid",
        type: "bool",
        indexed: true,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AccessControlBadConfirmation",
    inputs: [],
  },
  {
    type: "error",
    name: "AccessControlEnforcedDefaultAdminDelay",
    inputs: [
      {
        name: "schedule",
        type: "uint48",
        internalType: "uint48",
      },
    ],
  },
  {
    type: "error",
    name: "AccessControlEnforcedDefaultAdminRules",
    inputs: [],
  },
  {
    type: "error",
    name: "AccessControlInvalidDefaultAdmin",
    inputs: [
      {
        name: "defaultAdmin",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AccessControlUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
      {
        name: "neededRole",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "EnforcedPause",
    inputs: [],
  },
  {
    type: "error",
    name: "ExpectedPause",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeCastOverflowedUintDowncast",
    inputs: [
      {
        name: "bits",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
] as const;
