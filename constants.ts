export const IONIC_CONTRACT = "0x5d4FE9b1Dc67d20ac79E5e8386D46517aA6b657c";
export const LISK_TOKEN = "0xac485391EB2d7D88253a7F1eF18C37f4242D1A24";
export const WETH_TOKEN = "0x4200000000000000000000000000000000000006";
export const LISK_RPC ="https://lisk.drpc.org";

export const BORROW_AMOUNT = 0.16;
export const SUPPLY_AMOUNT = 0.01;
export const MAX_APPROVE = 99999999999999;
export const IONIC_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "borrowAmount",
        type: "uint256",
      },
    ],
    name: "borrow",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "redeemAmount",
        type: "uint256",
      },
    ],
    name: "redeemUnderlying",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "repayAmount",
        type: "uint256",
      },
    ],
    name: "repayBorrow",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];



export const ERC20_ABI = [
  {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
          {
              name: "",
              type: "string",
          },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
  },
  {
      constant: false,
      inputs: [
          {
              name: "_spender",
              type: "address",
          },
          {
              name: "_value",
              type: "uint256",
          },
      ],
      name: "approve",
      outputs: [
          {
              name: "",
              type: "bool",
          },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
          {
              name: "",
              type: "uint256",
          },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
  },
  {
      constant: false,
      inputs: [
          {
              name: "_from",
              type: "address",
          },
          {
              name: "_to",
              type: "address",
          },
          {
              name: "_value",
              type: "uint256",
          },
      ],
      name: "transferFrom",
      outputs: [
          {
              name: "",
              type: "bool",
          },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
          {
              name: "",
              type: "uint8",
          },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
  },
  {
      constant: true,
      inputs: [
          {
              name: "_owner",
              type: "address",
          },
      ],
      name: "balanceOf",
      outputs: [
          {
              name: "balance",
              type: "uint256",
          },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
  },
  {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
          {
              name: "",
              type: "string",
          },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
  },
  {
      constant: false,
      inputs: [
          {
              name: "_to",
              type: "address",
          },
          {
              name: "_value",
              type: "uint256",
          },
      ],
      name: "transfer",
      outputs: [
          {
              name: "",
              type: "bool",
          },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
  },
  {
      constant: true,
      inputs: [
          {
              name: "_owner",
              type: "address",
          },
          {
              name: "_spender",
              type: "address",
          },
      ],
      name: "allowance",
      outputs: [
          {
              name: "",
              type: "uint256",
          },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
  },
  {
      payable: true,
      stateMutability: "payable",
      type: "fallback",
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              name: "owner",
              type: "address",
          },
          {
              indexed: true,
              name: "spender",
              type: "address",
          },
          {
              indexed: false,
              name: "value",
              type: "uint256",
          },
      ],
      name: "Approval",
      type: "event",
  },
  {
      anonymous: false,
      inputs: [
          {
              indexed: true,
              name: "from",
              type: "address",
          },
          {
              indexed: true,
              name: "to",
              type: "address",
          },
          {
              indexed: false,
              name: "value",
              type: "uint256",
          },
      ],
      name: "Transfer",
      type: "event",
  },
];
