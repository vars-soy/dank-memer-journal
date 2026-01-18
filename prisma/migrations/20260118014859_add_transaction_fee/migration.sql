/*
  Warnings:

  - This is a custom migration that alters the "transaction" with a "fee" column

*/

-- 1) Add "fee" column
ALTER TABLE "transaction" ADD COLUMN "fee" INTEGER;

-- 2) Backfill column
UPDATE "transaction"
SET "fee" = ROUND(
  ("quantity" * "unit_value" * (0.02 + GREATEST(0, "days" - 1) * 0.005))::numeric
);

-- 3) Make column non-nullable
ALTER TABLE "transaction" ALTER COLUMN "fee" SET NOT NULL;