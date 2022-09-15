import { COIN_TYPES, TRANSACTION_TYPES } from "./constants";

export const coinTypeNumberToText = (coinType: number): string => {
  switch (coinType) {
    case COIN_TYPES.SOL:
      return "SOL";
    case COIN_TYPES.USDC:
      return "USDC";
    case COIN_TYPES.CCC:
      return "CCC";
    default:
      return "?";
  }
};

export const transactionTypeNumberToText = (
  transactionType: number
): string => {
  switch (transactionType) {
    case TRANSACTION_TYPES.Deposit:
      return "Deposit";
    case TRANSACTION_TYPES.Withdraw:
      return "Withdraw";
    case TRANSACTION_TYPES.CoinflipBet:
      return "Coinflip Bet";
    case TRANSACTION_TYPES.CoinflipIncome:
      return "Coinflip Income";
    case TRANSACTION_TYPES.RouletteBet:
      return "Roulette Bet";
    case TRANSACTION_TYPES.RouletteIncome:
      return "Roulette Income";
    case TRANSACTION_TYPES.CrashBet:
      return "Crash Bet";
    case TRANSACTION_TYPES.CrashIncome:
      return "Crash Income";
    case TRANSACTION_TYPES.RedeemIncome:
      return "Redeem Income";
    default:
      return "";
  }
};
