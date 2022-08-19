import { PublicKey } from "@solana/web3.js";
import {
  CASINOCATS_PROGRAM_ID,
  PDA_CAT_BOX_WORD,
  PDA_CAT_DEPOSIT_RECEIPT_WORD,
} from "./constants";

export const findPoolAuthorityPDA = async (pool: PublicKey) => {
  return await PublicKey.findProgramAddress(
    [pool.toBytes()],
    new PublicKey(CASINOCATS_PROGRAM_ID)
  );
};

export const findCatBoxPDA = async (pool: PublicKey, mint: PublicKey) => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(PDA_CAT_BOX_WORD), pool.toBytes(), mint.toBytes()],
    new PublicKey(CASINOCATS_PROGRAM_ID)
  );
};

export const findCatDepositReceiptPDA = async (
  pool: PublicKey,
  mint: PublicKey
) => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(PDA_CAT_DEPOSIT_RECEIPT_WORD), pool.toBytes(), mint.toBytes()],
    new PublicKey(CASINOCATS_PROGRAM_ID)
  );
};
