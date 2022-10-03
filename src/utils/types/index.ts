export type TransactionType = {
  id: string;
  amount: number;
  createdAt: string;
  confirmed: boolean;
  confirmedAt: string;
  signature: string;
  type: number;
  user: UserType;
  coinType: number;
};

export type DepositTransactionType = {
  id: string;
  user: UserType;
  coinType: number;
  amount: number;
  signature: string;
  approved: boolean;
  createdAt: string;
  approvedAt: string;
};

export type WithdrawTransactionType = {
  id: string;
  user: UserType;
  coinType: number;
  amount: number;
  approved: boolean;
  createdAt: string;
  approvedAt: string;
};

export type UserType = {
  id: string;
  walletAddress: string;
  username: string;
  solBalance: number;
  usdcBalance: number;
  cccBalance: number;
  avatar: string;
  level: number;
  exp: number;
  email: string;
  role: string;
  isPrivate: boolean;
};

export type RedemptionType = {
  round: number;
  coinType: number;
  amount: number;
  code: string;
  redeemed: boolean;
  createdAt: string;
  redeemedAt: string | null;
  userId: string | null;
};
