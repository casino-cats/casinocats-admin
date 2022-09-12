import { fetcher, patcher } from "./fetcher";

export const auth = (body: { publicKey: Uint8Array; signature: Buffer }) => {
  return fetcher("auth/signin", body);
};

export const getNonce = (body: { publicKey: string }) => {
  return fetcher("auth/nonce", body);
};

export const getMe = () => {
  return fetcher("user/me");
};

export const getAllTransactions = () => {
  return fetcher("admin/transaction/all");
};

export const confirmTransaction = (body: { transactionId: string }) => {
  return patcher("admin/transaction/confirm", body);
};
