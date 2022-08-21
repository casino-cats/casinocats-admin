import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

type PoolType = {
  poolAddress: string;
  poolName: string;
  depositStartTs: number;
  depositEndTs: number;
  stakeEndTs: number;
  numberOfCats: number;
  createdAt: number;
};

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
  closePool: ({ pool }: { pool: PublicKey }) => Promise<any>;
  fetchAllPool: () => Promise<PoolType[]>;
};

export type { ClientType, PoolType };