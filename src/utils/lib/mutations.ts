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

export const getDashboardData = () => {
  return fetcher("admin/dashboard");
};

export const getAllUsers = () => {
  return fetcher("admin/user/all");
};

export const getAllTransactions = () => {
  return fetcher("admin/transaction/all");
};

export const getDepositList = (body?: { skip: number; take: number }) => {
  return fetcher("admin/transaction/deposit-list", body);
};

export const getWithdrawList = (body?: { skip: number; take: number }) => {
  return fetcher("admin/transaction/withdraw-list", body);
};

export const confirmTransaction = (body: {
  transactionId: string;
  signature?: string;
}) => {
  return patcher("admin/transaction/confirm", body);
};

export const generateRedemptions = (body: {
  supply: number;
  coinType: number;
  minAmount: number;
  maxAmount: number;
}) => {
  return fetcher("admin/redemption/generate", body);
};

export const getRedemptionListGroupedByRound = () => {
  return fetcher("admin/redemption/get-grouped-by-round");
};
