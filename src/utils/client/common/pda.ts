import { PublicKey } from "@solana/web3.js";
import {
  CASINOCATS_PROGRAM_ID,
  PDA_CAT_BOX_WORD,
  PDA_CAT_DEPOSIT_RECEIPT_WORD,
  PDA_CCC_POT_WORD,
  PDA_SOL_POT_WORD,
  PDA_USDC_POT_WORD,
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

export const findSolPotPDA = async (pool: PublicKey) => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(PDA_SOL_POT_WORD), pool.toBytes()],
    new PublicKey(CASINOCATS_PROGRAM_ID)
  );
};

export const findUsdcRewardPotPDA = async (pool: PublicKey) => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(PDA_USDC_POT_WORD), pool.toBytes()],
    new PublicKey(CASINOCATS_PROGRAM_ID)
  );
};

export const findCccRewardPotPDA = async (pool: PublicKey) => {
  return await PublicKey.findProgramAddress(
    [Buffer.from(PDA_CCC_POT_WORD), pool.toBytes()],
    new PublicKey(CASINOCATS_PROGRAM_ID)
  );
};
