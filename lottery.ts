export type Lottery = {
  "version": "0.0.1",
  "name": "lottery",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "adminSigner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintSigner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintPrice",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u64"
        },
        {
          "name": "amountPerSlot",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "feeTo",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateConfig",
      "accounts": [
        {
          "name": "adminSigner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintPrice",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u64"
        },
        {
          "name": "amountPerSlot",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "feeTo",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "draw",
      "accounts": [
        {
          "name": "userSigner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintAuthorityPdaBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tryCount",
            "type": "u64"
          },
          {
            "name": "successCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "configAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintPrice",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "amountPerSlot",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "feeTo",
            "type": "publicKey"
          },
          {
            "name": "mintedAmount",
            "type": "u64"
          },
          {
            "name": "lastMintSlot",
            "type": "u64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "mintAuthorityPda",
      "type": {
        "kind": "struct",
        "fields": []
      }
    }
  ],
  "events": [
    {
      "name": "DrawEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "time",
          "type": "i64",
          "index": false
        },
        {
          "name": "slot",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ActivityNotYetStarted",
      "msg": "mint activity not yet started."
    },
    {
      "code": 6001,
      "name": "ActivityAreadyEnded",
      "msg": "mint activity already ended."
    }
  ]
};

export const IDL: Lottery = {
  "version": "0.0.1",
  "name": "lottery",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "adminSigner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintSigner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintPrice",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u64"
        },
        {
          "name": "amountPerSlot",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "feeTo",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateConfig",
      "accounts": [
        {
          "name": "adminSigner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintPrice",
          "type": "u64"
        },
        {
          "name": "totalSupply",
          "type": "u64"
        },
        {
          "name": "amountPerSlot",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "feeTo",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "draw",
      "accounts": [
        {
          "name": "userSigner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "configAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mintAuthorityPdaBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tryCount",
            "type": "u64"
          },
          {
            "name": "successCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "configAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintPrice",
            "type": "u64"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "amountPerSlot",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "feeTo",
            "type": "publicKey"
          },
          {
            "name": "mintedAmount",
            "type": "u64"
          },
          {
            "name": "lastMintSlot",
            "type": "u64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "mintAuthorityPda",
      "type": {
        "kind": "struct",
        "fields": []
      }
    }
  ],
  "events": [
    {
      "name": "DrawEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "time",
          "type": "i64",
          "index": false
        },
        {
          "name": "slot",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ActivityNotYetStarted",
      "msg": "mint activity not yet started."
    },
    {
      "code": 6001,
      "name": "ActivityAreadyEnded",
      "msg": "mint activity already ended."
    }
  ]
};
