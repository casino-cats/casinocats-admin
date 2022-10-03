import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

type PoolType = {
  poolAddress: string;
  poolName: string;
  depositStartTs: number;
  depositEndTs: number;
  stakeEndTs: number;
  numberOfCats: number;
  solAmount: number;
  usdcAmount: number;
  cccAmount: number;
  createdAt: number;
};

type NftListType = {
  nftListAddress: string;
  collectionName: string;
};

type ClientType = {
  depositSol: () => Promise<any>;

  withdrawSol: ({
    destination,
    amount,
  }: {
    destination: string;
    amount: number;
  }) => Promise<any>;

  withdrawUsdc: ({
    destination,
    amount,
  }: {
    destination: string;
    amount: number;
  }) => Promise<any>;

  createNftList: ({
    numberOfNfts,
    collectionName,
  }: {
    numberOfNfts: number;
    collectionName: string;
  }) => Promise<any>;

  fetchNftListAcc: () => Promise<NftListType[]>;

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

  fundSol: ({
    pool,
    amount,
  }: {
    pool: PublicKey;
    amount: number;
  }) => Promise<any>;

  refundSol: ({
    pool,
    amount,
  }: {
    pool: PublicKey;
    amount: number;
  }) => Promise<any>;

  fundUsdc: ({
    pool,
    amount,
  }: {
    pool: PublicKey;
    amount: number;
  }) => Promise<any>;

  refundUsdc: ({
    pool,
    amount,
  }: {
    pool: PublicKey;
    amount: number;
  }) => Promise<any>;

  fundCcc: ({
    pool,
    amount,
  }: {
    pool: PublicKey;
    amount: number;
  }) => Promise<any>;

  refundCcc: ({
    pool,
    amount,
  }: {
    pool: PublicKey;
    amount: number;
  }) => Promise<any>;

  updatePool: ({
    pool,
    depositStartTs,
    depositEndTs,
    stakeEndTs,
  }: {
    pool: PublicKey;
    depositStartTs: anchor.BN;
    depositEndTs: anchor.BN;
    stakeEndTs: anchor.BN;
  }) => Promise<any>;

  fetchAllPool: () => Promise<PoolType[]>;
};

export type { ClientType, PoolType, NftListType };
