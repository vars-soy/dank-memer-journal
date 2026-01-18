import { prisma } from "@/lib/db/client";
import { TransactionType } from "@/generated/prisma/client";
import {
  type Investment,
  type Transaction,
  type User,
} from "@/generated/prisma/client";
import type {
  TransactionCreateInput,
  TransactionUpdateInput,
} from "@/generated/prisma/models";

type InsertTransactionArgs = Pick<
  TransactionCreateInput,
  | "days"
  | "fee"
  | "fulfilledQuantity"
  | "marketId"
  | "quantity"
  | "status"
  | "unitValue"
> & {
  investmentId: Investment["id"];
  userId: User["id"];
};

export async function insertTransaction(args: InsertTransactionArgs) {
  return await prisma.transaction.create({
    data: {
      days: args.days,
      marketId: args.marketId,
      fee: args.fee,
      fulfilledQuantity: args.fulfilledQuantity,
      quantity: args.quantity,
      status: args.status,
      type: TransactionType.SELL,
      unitValue: args.unitValue,
      investment: {
        connect: {
          id: args.investmentId,
        },
      },
      user: {
        connect: {
          id: args.userId,
        },
      },
    },
  });
}

type UpdateTransactionData = Pick<
  TransactionUpdateInput,
  | "days"
  | "marketId"
  | "fee"
  | "fulfilledQuantity"
  | "quantity"
  | "status"
  | "unitValue"
>;

export async function updateTransaction(
  id: Transaction["id"],
  data: UpdateTransactionData,
) {
  return await prisma.transaction.update({
    where: { id },
    data,
  });
}

export async function deleteTransactionById(
  id: Transaction["id"],
  userId: User["id"],
) {
  return await prisma.transaction.delete({
    where: { id, userId },
  });
}
