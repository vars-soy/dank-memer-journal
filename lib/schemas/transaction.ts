import * as v from "valibot";
import { TRANSACTION_STATUS } from "@/lib/db/enums";

export const transactionInputSchema = v.pipe(
  v.object({
    days: v.pipe(
      v.number(),
      v.integer("Must be a whole number"),
      v.minValue(1, "Must be at least 1"),
    ),
    fulfilledQuantity: v.pipe(
      v.number(),
      v.integer("Must be a whole number"),
      v.minValue(0, "Must be at least 0"),
    ),
    marketId: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(6, "Must be at least 6 characters long"),
      v.regex(/^[a-zA-Z0-9]+$/, "Must have only letters and numbers"),
    ),
    quantity: v.pipe(
      v.number(),
      v.integer("Must be a whole number"),
      v.minValue(1, "Must be at least 1"),
    ),
    status: v.union([
      v.literal(TRANSACTION_STATUS.ACTIVE),
      v.literal(TRANSACTION_STATUS.EXPIRED),
      v.literal(TRANSACTION_STATUS.FULFILLED),
      v.literal(TRANSACTION_STATUS.REMOVED),
    ]),
    unitValue: v.pipe(
      v.number(),
      v.integer("Must be a whole number"),
      v.minValue(0, "Must be at least 0"),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["fulfilledQuantity"], ["quantity"]],
      (input) => input.fulfilledQuantity <= input.quantity,
      "Must be less than or equal to quantity",
    ),
    ["fulfilledQuantity"],
  ),
);
