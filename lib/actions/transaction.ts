"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import * as v from "valibot";
import { auth } from "@/lib/auth";
import {
  deleteTransactionById,
  insertTransaction,
  updateTransaction,
} from "@/lib/db/api/transaction";
import { transactionInputSchema } from "@/lib/schemas/transaction";
import type { Investment, Transaction } from "@/generated/prisma/client";

export async function createTransaction(
  investmentId: Investment["id"],
  pathname: string,
  _: unknown,
  formData: FormData,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      data: null,
      error: {
        type: "auth" as const,
        message: "Not authenticated",
      },
    };
  }

  const validationResult = v.safeParse(transactionInputSchema, {
    days: Number.parseInt(String(formData.get("days"))),
    marketId: formData.get("marketId")?.toString()?.toUpperCase(),
    fulfilledQuantity: Number.parseInt(
      String(formData.get("fulfilledQuantity")),
    ),
    quantity: Number.parseInt(String(formData.get("quantity"))),
    status: formData.get("status"),
    unitValue: Number.parseInt(String(formData.get("unitValue"))),
  });

  if (!validationResult.success && validationResult.issues) {
    return {
      success: false,
      data: null,
      error: {
        type: "validation" as const,
        message: "Invalid data",
        issues: v.flatten<typeof transactionInputSchema>(
          validationResult.issues,
        ),
      },
    };
  }

  const { output: values } = validationResult;

  const transaction = await insertTransaction({
    ...values,
    userId: session.user.id,
    investmentId,
  });

  revalidatePath(pathname);

  return {
    success: true,
    data: transaction,
    error: null,
  };
}

export async function editTransaction(
  transactionId: Transaction["id"],
  pathname: string,
  _: unknown,
  formData: FormData,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      data: null,
      error: {
        type: "auth" as const,
        message: "Not authenticated",
      },
    };
  }

  const validationResult = v.safeParse(transactionInputSchema, {
    days: Number.parseInt(String(formData.get("days"))),
    marketId: formData.get("marketId")?.toString()?.toUpperCase(),
    fulfilledQuantity: Number.parseInt(
      String(formData.get("fulfilledQuantity")),
    ),
    quantity: Number.parseInt(String(formData.get("quantity"))),
    status: formData.get("status"),
    unitValue: Number.parseInt(String(formData.get("unitValue"))),
  });

  if (!validationResult.success && validationResult.issues) {
    return {
      success: false,
      data: null,
      error: {
        type: "validation" as const,
        message: "Invalid data",
        issues: v.flatten<typeof transactionInputSchema>(
          validationResult.issues,
        ),
      },
    };
  }

  const { output: values } = validationResult;

  const transaction = await updateTransaction(transactionId, values);

  revalidatePath(pathname);

  return {
    success: true,
    data: transaction,
    error: null,
  };
}

export async function deleteTransaction(
  id: Transaction["id"],
  pathname?: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not Authenticated");
  }

  const result = await deleteTransactionById(id, session.user.id);

  if (pathname) {
    revalidatePath(pathname);
  }

  return {
    success: true,
    data: result,
  };
}
