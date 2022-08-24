import * as anchor from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  CASINOCATS_HOUSE_WALLET,
  CASINOCATS_PROGRAM_ID,
  CCC_MINT_DEVNET,
  USDC_MINT_DEVNET,
} from "./common";
import {
  findCccRewardPotPDA,
  findPoolAuthorityPDA,
  findSolPotPDA,
  findUsdcRewardPotPDA,
} from "./common/pda";
import { CasinocatsProgram, IDL } from "./types/casinocatsProgram";
import { ClientType } from "./types/clientType";

const createClient = ({
  provider,
}: {
  provider: anchor.AnchorProvider;
}): ClientType => {
  const program = new anchor.Program<CasinocatsProgram>(
    IDL,
    CASINOCATS_PROGRAM_ID,
    provider
  );
  return {
    depositSol: async () => {
      const txSig = await program.methods
        .depositSol(new anchor.BN(100000000))
        .accounts({
          payer: (program.provider as anchor.AnchorProvider).wallet.publicKey,
          houseAcc: new PublicKey(CASINOCATS_HOUSE_WALLET),
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log(txSig);
    },

    createNftList: async ({ numberOfNfts, collectionName }) => {
      const nftListKey = Keypair.generate();

      if (!numberOfNfts || !collectionName || !nftListKey) {
        throw Error("One or more params were not defined");
      }

      const size =
        8 +
        1 +
        4 +
        Buffer.from(collectionName, "utf8").length +
        32 * numberOfNfts;

      const rent =
        await program.provider.connection.getMinimumBalanceForRentExemption(
          size
        );

      const transaction = new Transaction();
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: (program.provider as anchor.AnchorProvider).wallet
            .publicKey,
          newAccountPubkey: nftListKey.publicKey,
          lamports: rent,
          space: size,
          programId: new PublicKey(CASINOCATS_PROGRAM_ID),
        })
      );
      transaction.add(
        await program.methods
          .createNftList(collectionName)
          .accounts({
            nftList: nftListKey.publicKey,
            creator: (program.provider as anchor.AnchorProvider).wallet
              .publicKey,
          })
          .instruction()
      );

      // @ts-ignore
      const txSig = await program.provider.sendAndConfirm(
        transaction,
        [nftListKey],
        {
          preflightCommitment: "confirmed",
        }
      );

      console.log(txSig);
    },

    fetchNftListAcc: async () => {
      const accs = await program.account.nftList.all();
      return accs.map((acc) => ({
        nftListAddress: acc.publicKey.toBase58(),
        collectionName: acc.account.collectionName,
      }));
    },

    updateNftList: async ({ nftList, mints }) => {
      const txSig = await program.methods
        .updateNftList(mints)
        .accounts({
          nftList: nftList,
          manager: (program.provider as anchor.AnchorProvider).wallet.publicKey,
        })
        .rpc();
      console.log(txSig);
      return txSig;
    },

    initPool: async ({
      poolName,
      depositStartTs,
      depositEndTs,
      stakeEndTs,
    }) => {
      const keypair = Keypair.generate();

      const signers: Signer[] = [keypair];

      const [poolAuthority, poolAuthorityBump] = await findPoolAuthorityPDA(
        keypair.publicKey
      );

      console.log("pool authority", poolAuthority.toBase58());

      const [usdcRewardPot, usdcRewardPotBump] = await findUsdcRewardPotPDA(
        keypair.publicKey
      );

      const [cccRewardPot, cccRewardPotBump] = await findCccRewardPotPDA(
        keypair.publicKey
      );

      const txSig = await program.methods
        .initPool(poolName, depositStartTs, depositEndTs, stakeEndTs)
        .accounts({
          pool: keypair.publicKey,
          manager: (program.provider as anchor.AnchorProvider).wallet.publicKey,
          poolAuthority: poolAuthority,
          usdcRewardPot: usdcRewardPot,
          usdcMint: new PublicKey(USDC_MINT_DEVNET),
          cccRewardPot: cccRewardPot,
          cccMint: new PublicKey(CCC_MINT_DEVNET),
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers(signers)
        .rpc();
      console.log(txSig);
    },

    closePool: async ({ pool }) => {
      const txSig = await program.methods
        .closePool()
        .accounts({
          pool: pool,
          manager: (program.provider as anchor.AnchorProvider).wallet.publicKey,
          receiver: (program.provider as anchor.AnchorProvider).wallet
            .publicKey,
        })
        .rpc();
      console.log(txSig);
    },

    fundSol: async ({ pool, amount }) => {
      const [solPot, solPotBump] = await findSolPotPDA(pool);
      console.log(solPot.toBase58());
      console.log(solPotBump);
      const txSig = await program.methods
        .fundSol(solPotBump, new anchor.BN(amount * LAMPORTS_PER_SOL))
        .accounts({
          pool: pool,
          solPot: solPot,
          manager: (program.provider as anchor.AnchorProvider).wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log(txSig);
    },

    refundSol: async ({ pool, amount }) => {
      const [solPot, solPotBump] = await findSolPotPDA(pool);
      console.log(solPot.toBase58());
      console.log(solPotBump);
      const txSig = await program.methods
        .refundSol(solPotBump, new anchor.BN(amount * LAMPORTS_PER_SOL))
        .accounts({
          pool: pool,
          solPot: solPot,
          manager: (program.provider as anchor.AnchorProvider).wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log(txSig);
    },

    updatePool: async ({ pool, depositStartTs, depositEndTs, stakeEndTs }) => {
      const txSig = await program.methods
        .updatePool(depositStartTs, depositEndTs, stakeEndTs)
        .accounts({
          pool: pool,
          manager: (program.provider as anchor.AnchorProvider).wallet.publicKey,
        })
        .rpc();
      console.log(txSig);
    },

    fetchAllPool: async () => {
      const poolList = await program.account.pool.all();
      return poolList.map((pool) => ({
        poolAddress: pool.publicKey.toBase58(),
        poolName: String.fromCharCode(...pool.account.poolName).replace(
          /\0/g,
          ""
        ),
        depositStartTs: pool.account.depositStartTs.toNumber(),
        depositEndTs: pool.account.depositEndTs.toNumber(),
        stakeEndTs: pool.account.stakeEndTs.toNumber(),
        numberOfCats: pool.account.numberOfCats,
        solAmount: pool.account.amountOfSol.toNumber() / LAMPORTS_PER_SOL,
        createdAt: pool.account.createdTs.toNumber(),
      }));
    },
  };
};

export { createClient };
