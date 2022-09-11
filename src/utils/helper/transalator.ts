import { COIN_TYPES } from "./constants";

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
