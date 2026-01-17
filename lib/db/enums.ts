type EnumType<T extends Record<string, string>> = T[keyof T];

export const TRANSACTION_TYPE = {
  BUY: "BUY",
  SELL: "SELL",
} as const;

export type TransactionType = EnumType<typeof TRANSACTION_TYPE>;

export const TRANSACTION_STATUS = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  FULFILLED: "FULFILLED",
  REMOVED: "REMOVED",
} as const;

export type TransactionStatus = EnumType<typeof TRANSACTION_STATUS>;
