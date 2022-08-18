export type CasinocatsProgram = {
  version: "0.1.0";
  name: "casinocats_program";
  instructions: [
    {
      name: "depositSol";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "houseAcc";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "createNftList";
      accounts: [
        {
          name: "nftList";
          isMut: true;
          isSigner: false;
        },
        {
          name: "creator";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "collectionName";
          type: "string";
        }
      ];
    },
    {
      name: "updateNftList";
      accounts: [
        {
          name: "nftList";
          isMut: true;
          isSigner: false;
        },
        {
          name: "manager";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "mints";
          type: {
            vec: {
              defined: "UpdateIndex";
            };
          };
        }
      ];
    },
    {
      name: "initPool";
      accounts: [
        {
          name: "pool";
          isMut: true;
          isSigner: true;
        },
        {
          name: "manager";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "poolName";
          type: "string";
        },
        {
          name: "depositStartTs";
          type: "u64";
        },
        {
          name: "depositEndTs";
          type: "u64";
        },
        {
          name: "stakeEndTs";
          type: "u64";
        }
      ];
    },
    {
      name: "closePool";
      accounts: [
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "manager";
          isMut: false;
          isSigner: true;
        },
        {
          name: "receiver";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "depositCat";
      accounts: [
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "catDepositReceipt";
          isMut: true;
          isSigner: false;
        },
        {
          name: "catBox";
          isMut: true;
          isSigner: false;
        },
        {
          name: "catSource";
          isMut: true;
          isSigner: false;
        },
        {
          name: "catMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "catDepositReceipt";
      type: {
        kind: "struct";
        fields: [
          {
            name: "pool";
            type: "publicKey";
          },
          {
            name: "catMint";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "nftList";
      type: {
        kind: "struct";
        fields: [
          {
            name: "version";
            type: "u8";
          },
          {
            name: "collectionName";
            type: "string";
          }
        ];
      };
    },
    {
      name: "pool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "poolName";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "manager";
            type: "publicKey";
          },
          {
            name: "locked";
            type: "bool";
          },
          {
            name: "depositStartTs";
            type: "u64";
          },
          {
            name: "depositEndTs";
            type: "u64";
          },
          {
            name: "stakeEndTs";
            type: "u64";
          },
          {
            name: "numberOfCats";
            type: "u32";
          },
          {
            name: "amountOfReward";
            type: "u64";
          },
          {
            name: "createdTs";
            type: "u64";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "UpdateIndex";
      type: {
        kind: "struct";
        fields: [
          {
            name: "index";
            type: "u32";
          },
          {
            name: "mint";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidParameter";
      msg: "Invalid parameter passed";
    },
    {
      code: 6001;
      name: "PoolLocked";
      msg: "Pool is already locked";
    },
    {
      code: 6002;
      name: "InvalidDepositTs";
      msg: "Can not deposit cat now";
    }
  ];
};

export const IDL: CasinocatsProgram = {
  version: "0.1.0",
  name: "casinocats_program",
  instructions: [
    {
      name: "depositSol",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "houseAcc",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "createNftList",
      accounts: [
        {
          name: "nftList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "collectionName",
          type: "string",
        },
      ],
    },
    {
      name: "updateNftList",
      accounts: [
        {
          name: "nftList",
          isMut: true,
          isSigner: false,
        },
        {
          name: "manager",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "mints",
          type: {
            vec: {
              defined: "UpdateIndex",
            },
          },
        },
      ],
    },
    {
      name: "initPool",
      accounts: [
        {
          name: "pool",
          isMut: true,
          isSigner: true,
        },
        {
          name: "manager",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "poolName",
          type: "string",
        },
        {
          name: "depositStartTs",
          type: "u64",
        },
        {
          name: "depositEndTs",
          type: "u64",
        },
        {
          name: "stakeEndTs",
          type: "u64",
        },
      ],
    },
    {
      name: "closePool",
      accounts: [
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "manager",
          isMut: false,
          isSigner: true,
        },
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "depositCat",
      accounts: [
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "catDepositReceipt",
          isMut: true,
          isSigner: false,
        },
        {
          name: "catBox",
          isMut: true,
          isSigner: false,
        },
        {
          name: "catSource",
          isMut: true,
          isSigner: false,
        },
        {
          name: "catMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "catDepositReceipt",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pool",
            type: "publicKey",
          },
          {
            name: "catMint",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "nftList",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u8",
          },
          {
            name: "collectionName",
            type: "string",
          },
        ],
      },
    },
    {
      name: "pool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "poolName",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "manager",
            type: "publicKey",
          },
          {
            name: "locked",
            type: "bool",
          },
          {
            name: "depositStartTs",
            type: "u64",
          },
          {
            name: "depositEndTs",
            type: "u64",
          },
          {
            name: "stakeEndTs",
            type: "u64",
          },
          {
            name: "numberOfCats",
            type: "u32",
          },
          {
            name: "amountOfReward",
            type: "u64",
          },
          {
            name: "createdTs",
            type: "u64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "UpdateIndex",
      type: {
        kind: "struct",
        fields: [
          {
            name: "index",
            type: "u32",
          },
          {
            name: "mint",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidParameter",
      msg: "Invalid parameter passed",
    },
    {
      code: 6001,
      name: "PoolLocked",
      msg: "Pool is already locked",
    },
    {
      code: 6002,
      name: "InvalidDepositTs",
      msg: "Can not deposit cat now",
    },
  ],
};
