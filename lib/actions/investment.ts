"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import * as v from "valibot";
import { auth } from "@/lib/auth";
import { investmentInputSchema } from "@/lib/schemas/investment";
import {
  deleteInvestmentById,
  insertInvestment,
} from "@/lib/db/api/investment";
import { Investment } from "@/generated/prisma/client";
import { redirect } from "next/navigation";

export async function createInvestment(_: unknown, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      data: null,
      error: {
        type: "auth" as const,
        message: "Not authenticated",
      },
    };
  }

  const validationResult = v.safeParse(investmentInputSchema, {
    marketId: formData.get("marketId")?.toString().toUpperCase(),
    item: formData.get("item"),
    quantity: Number.parseInt(String(formData.get("quantity"))),
    unitValue: Number.parseInt(String(formData.get("unitValue"))),
  });

  if (!validationResult.success && validationResult.issues) {
    return {
      data: null,
      error: {
        type: "validation" as const,
        message: "Invalid data",
        issues: v.flatten<typeof investmentInputSchema>(
          validationResult.issues,
        ),
      },
    };
  }

  const { output: values } = validationResult;

  const investment = await insertInvestment({
    ...values,
    userId: session.user.id,
  });

  revalidatePath("/investments");

  return {
    data: investment,
    error: null,
  };
}

export async function deleteInvestment(id: Investment["id"]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not Authenticated");
  }

  await deleteInvestmentById(id, session.user.id);

  redirect("/investments");
}
