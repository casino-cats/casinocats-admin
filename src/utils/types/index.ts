export type TransactionType = {
  id: string;
  amount: number;
  createdAt: string;
  confirmed: boolean;
  confirmedAt: string;
  signature: string;
  type: number;
  user: string;
  coinType: number;
};
