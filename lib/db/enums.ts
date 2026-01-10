export const TRANSACTION_TYPE = {
  BUY: "BUY",
  SELL: "SELL",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export const TRANSACTION_STATUS = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  FULFILLED: "FULFILLED",
  REMOVED: "REMOVED",
} as const;

export type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];
