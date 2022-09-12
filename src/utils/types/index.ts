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

export type UserType = {
  id: string;
  walletAddress: string;
  username: string;
  solBalance: number;
  usdcBalance: number;
  avatar: string;
  level: number;
  exp: number;
  role: string;
};
