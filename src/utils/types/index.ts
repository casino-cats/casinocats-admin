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
