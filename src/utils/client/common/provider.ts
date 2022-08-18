import { AnchorProvider } from "@project-serum/anchor";
import { Connection, Transaction, PublicKey } from "@solana/web3.js";

interface Wallet {
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
  publicKey: PublicKey;
}

function createProvider(connection: Connection, wallet: Wallet) {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  return provider;
}

export { createProvider };
export type { Wallet, AnchorProvider };
