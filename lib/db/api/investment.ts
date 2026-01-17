import type { Investment, Prisma, User } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/client";

export async function getAllInvestmentsByUserId(userId: string) {
  return await prisma.investment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

type InsertInvestmentArgs = Pick<
  Prisma.InvestmentCreateInput,
  "item" | "marketId" | "quantity" | "unitValue"
> & {
  userId: string;
};

export async function insertInvestment(data: InsertInvestmentArgs) {
  // [TODO] Add error handling
  return await prisma.investment.create({
    data: {
      marketId: data.marketId,
      item: data.item,
      quantity: data.quantity,
      unitValue: data.unitValue,
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
}

export async function deleteInvestmentById(
  id: Investment["id"],
  userId: User["id"],
) {
  return await prisma.investment.delete({
    where: { id, userId },
  });
}

export async function getInvestmentCount(userId: User["id"]) {
  if (!userId.trim().length) {
    return null;
  }

  const result = await prisma.investment.aggregate({
    _count: true,
    where: { userId },
  });

  return result._count;
}
