import BigNumber from "bignumber.js";

export const BIG_ZERO = new BigNumber("0");
export const BIG_ONE = new BigNumber("1");
export const BIG_NINE = new BigNumber("9");
export const BIG_TEN = new BigNumber("10");
export const toBN = (val: any) => new BigNumber(val);
export const toDefaultDecimal = (val: any) => toBN(val).times(BIG_TEN.pow(18));
export const toDynamicDecimal = (val: any, pow: any) =>
  toBN(val).times(BIG_TEN.pow(pow));
export const toHumanReadable = (val: any, decimal: any) =>
  toBN(val).dividedBy(BIG_TEN.pow(toBN(decimal)));
