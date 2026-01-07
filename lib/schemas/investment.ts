import * as v from "valibot";

export const investmentInputSchema = v.object({
  marketId: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(5, "Market ID must be at least 5 characters long"),
    v.regex(/^[a-zA-Z0-9]+$/, "Market ID must have only letters and numbers"),
  ),
  item: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "Item must be at least 3 characters long"),
    v.regex(
      /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
      "Item must have only letters and single spaces",
    ),
  ),
  quantity: v.pipe(
    v.number(),
    v.integer("Quantity must be a whole number"),
    v.minValue(1, "Quantity must be at least 1"),
  ),
  unitValue: v.pipe(
    v.number(),
    v.integer("Unit Value must be a whole number"),
    v.minValue(0, "Unit Value must be at least 0"),
  ),
});
