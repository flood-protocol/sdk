export const permit2NonceFinderAbi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_permit2",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nextNonce",
		outputs: [
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "start",
				type: "uint256"
			}
		],
		name: "nextNonceAfter",
		outputs: [
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "permit2",
		outputs: [
			{
				internalType: "contract ISignatureTransfer",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	}
] as const

export const permit2Abi = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "maxAmount",
				type: "uint256"
			}
		],
		name: "InvalidAmount",
		type: "error"
	},
	{
		inputs: [],
		name: "LengthMismatch",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "word",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mask",
				type: "uint256"
			}
		],
		name: "UnorderedNonceInvalidation",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "wordPos",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mask",
				type: "uint256"
			}
		],
		name: "invalidateUnorderedNonces",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "nonceBitmap",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
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
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct ISignatureTransfer.TokenPermissions",
						name: "permitted",
						type: "tuple"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.PermitTransferFrom",
				name: "permit",
				type: "tuple"
			},
			{
				components: [
					{
						internalType: "address",
						name: "to",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "requestedAmount",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.SignatureTransferDetails",
				name: "transferDetails",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permitTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
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
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct ISignatureTransfer.TokenPermissions[]",
						name: "permitted",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
				name: "permit",
				type: "tuple"
			},
			{
				components: [
					{
						internalType: "address",
						name: "to",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "requestedAmount",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
				name: "transferDetails",
				type: "tuple[]"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permitTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
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
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct ISignatureTransfer.TokenPermissions",
						name: "permitted",
						type: "tuple"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.PermitTransferFrom",
				name: "permit",
				type: "tuple"
			},
			{
				components: [
					{
						internalType: "address",
						name: "to",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "requestedAmount",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.SignatureTransferDetails",
				name: "transferDetails",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "witness",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "witnessTypeString",
				type: "string"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permitWitnessTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
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
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct ISignatureTransfer.TokenPermissions[]",
						name: "permitted",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
				name: "permit",
				type: "tuple"
			},
			{
				components: [
					{
						internalType: "address",
						name: "to",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "requestedAmount",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
				name: "transferDetails",
				type: "tuple[]"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "witness",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "witnessTypeString",
				type: "string"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permitWitnessTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	}
] as const

export const bookAbi = [
	{
		inputs: [
			{
				internalType: "address",
				name: "permit2",
				type: "address"
			},
			{
				internalType: "address",
				name: "admin",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [],
		name: "IncorrectValueReceived",
		type: "error"
	},
	{
		inputs: [],
		name: "InsufficientAmountPulled",
		type: "error"
	},
	{
		inputs: [],
		name: "InsufficientAmountReceived",
		type: "error"
	},
	{
		inputs: [],
		name: "NotAContract",
		type: "error"
	},
	{
		inputs: [],
		name: "TooManyDecoders",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "decoderId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "decoder",
				type: "address"
			}
		],
		name: "DecoderAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [],
		name: "DefaultAdminDelayChangeCanceled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint48",
				name: "newDelay",
				type: "uint48"
			},
			{
				indexed: false,
				internalType: "uint48",
				name: "effectSchedule",
				type: "uint48"
			}
		],
		name: "DefaultAdminDelayChangeScheduled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [],
		name: "DefaultAdminTransferCanceled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "newAdmin",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint48",
				name: "acceptSchedule",
				type: "uint48"
			}
		],
		name: "DefaultAdminTransferScheduled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "orderId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "orderHash",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				indexed: false,
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "OrderEtched",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "orderHash",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "address",
				name: "offerer",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "fulfiller",
				type: "address"
			}
		],
		name: "OrderFulfilled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32"
			}
		],
		name: "RoleAdminChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			}
		],
		name: "RoleGranted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			}
		],
		name: "RoleRevoked",
		type: "event"
	},
	{
		stateMutability: "nonpayable",
		type: "fallback"
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "PERMIT2",
		outputs: [
			{
				internalType: "contract ISignatureTransfer",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "acceptDefaultAdminTransfer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "decoder",
				type: "address"
			}
		],
		name: "addDecoder",
		outputs: [
			{
				internalType: "uint8",
				name: "decoderId",
				type: "uint8"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		name: "beginDefaultAdminTransfer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [],
		name: "cancelDefaultAdminTransfer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint48",
				name: "newDelay",
				type: "uint48"
			}
		],
		name: "changeDefaultAdminDelay",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [],
		name: "defaultAdmin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "defaultAdminDelay",
		outputs: [
			{
				internalType: "uint48",
				name: "",
				type: "uint48"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "defaultAdminDelayIncreaseWait",
		outputs: [
			{
				internalType: "uint48",
				name: "",
				type: "uint48"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "offerer",
								type: "address"
							},
							{
								internalType: "address",
								name: "zone",
								type: "address"
							},
							{
								components: [
									{
										internalType: "address",
										name: "token",
										type: "address"
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256"
									}
								],
								internalType: "struct IFloodPlain.Item[]",
								name: "offer",
								type: "tuple[]"
							},
							{
								components: [
									{
										internalType: "address",
										name: "token",
										type: "address"
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256"
									}
								],
								internalType: "struct IFloodPlain.Item[]",
								name: "consideration",
								type: "tuple[]"
							},
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256"
							},
							{
								internalType: "uint256",
								name: "nonce",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Order",
						name: "order",
						type: "tuple"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct IFloodPlainOnChainOrders.OrderWithSignature",
				name: "orderWithSignature",
				type: "tuple"
			}
		],
		name: "etchOrder",
		outputs: [
			{
				internalType: "uint256",
				name: "orderId",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "orderId",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "fulfiller",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "extraData",
				type: "bytes"
			}
		],
		name: "fulfillEtchedOrder",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			},
			{
				internalType: "address",
				name: "fulfiller",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "extraData",
				type: "bytes"
			}
		],
		name: "fulfillOrder",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "fulfillOrder",
		outputs: [],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "decoderId",
				type: "uint256"
			}
		],
		name: "getDecoder",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "etchedOrderId",
				type: "uint256"
			}
		],
		name: "getEtchedOrder",
		outputs: [
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "offerer",
								type: "address"
							},
							{
								internalType: "address",
								name: "zone",
								type: "address"
							},
							{
								components: [
									{
										internalType: "address",
										name: "token",
										type: "address"
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256"
									}
								],
								internalType: "struct IFloodPlain.Item[]",
								name: "offer",
								type: "tuple[]"
							},
							{
								components: [
									{
										internalType: "address",
										name: "token",
										type: "address"
									},
									{
										internalType: "uint256",
										name: "amount",
										type: "uint256"
									}
								],
								internalType: "struct IFloodPlain.Item[]",
								name: "consideration",
								type: "tuple[]"
							},
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256"
							},
							{
								internalType: "uint256",
								name: "nonce",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Order",
						name: "order",
						type: "tuple"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct IFloodPlainOnChainOrders.OrderWithSignature",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			}
		],
		name: "getNonceStatus",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			}
		],
		name: "getOrderHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			}
		],
		name: "getOrderStatus",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "fulfiller",
				type: "address"
			},
			{
				internalType: "address",
				name: "caller",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "extraData",
				type: "bytes"
			}
		],
		name: "getOrderValidity",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "caller",
				type: "address"
			}
		],
		name: "getOrderValidity",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			}
		],
		name: "getPermitHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			}
		],
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "pendingDefaultAdmin",
		outputs: [
			{
				internalType: "address",
				name: "newAdmin",
				type: "address"
			},
			{
				internalType: "uint48",
				name: "schedule",
				type: "uint48"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "pendingDefaultAdminDelay",
		outputs: [
			{
				internalType: "uint48",
				name: "newDelay",
				type: "uint48"
			},
			{
				internalType: "uint48",
				name: "schedule",
				type: "uint48"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [],
		name: "rollbackDefaultAdminDelay",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
] as const

export const zoneAbi = [
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "book",
				type: "address"
			},
			{
				internalType: "address",
				name: "caller",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "orderHash",
				type: "bytes32"
			}
		],
		name: "validateOrder",
		outputs: [],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "offerer",
						type: "address"
					},
					{
						internalType: "address",
						name: "zone",
						type: "address"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "offer",
						type: "tuple[]"
					},
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct IFloodPlain.Item[]",
						name: "consideration",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					}
				],
				internalType: "struct IFloodPlain.Order",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "book",
				type: "address"
			},
			{
				internalType: "address",
				name: "fulfiller",
				type: "address"
			},
			{
				internalType: "address",
				name: "caller",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "orderHash",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "context",
				type: "bytes"
			}
		],
		name: "validateOrder",
		outputs: [],
		stateMutability: "view",
		type: "function"
	}
] as const
