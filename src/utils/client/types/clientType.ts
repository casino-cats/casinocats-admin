import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

type ClientType = {
  depositSol: () => Promise<any>;
  createNftList: ({
    numberOfNfts,
    collectionName,
  }: {
    numberOfNfts: number;
    collectionName: string;
  }) => Promise<any>;
  fetchNftListAcc: () => Promise<any>;
  updateNftList: ({
    nftList,
    mints,
  }: {
    nftList: PublicKey;
    mints: { index: number; mint: PublicKey }[];
  }) => Promise<any>;
  initPool: ({
    poolName,
    depositStartTs,
    depositEndTs,
    stakeEndTs,
  }: {
    poolName: string;
    depositStartTs: anchor.BN;
    depositEndTs: anchor.BN;
    stakeEndTs: anchor.BN;
  }) => Promise<any>;
  fetchAllPool: () => Promise<any>;
};

export type { ClientType };
