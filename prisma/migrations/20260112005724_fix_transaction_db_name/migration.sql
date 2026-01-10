/*
  Warnings:

  - You are about to drop the `market_offer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "market_offer" DROP CONSTRAINT "market_offer_investment_id_fkey";

-- DropForeignKey
ALTER TABLE "market_offer" DROP CONSTRAINT "market_offer_user_id_fkey";

-- DropTable
DROP TABLE "market_offer";

-- CreateTable
CREATE TABLE "transaction" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "market_id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL DEFAULT 'SELL',
    "status" "TransactionStatus" NOT NULL DEFAULT 'ACTIVE',
    "unit_value" INTEGER NOT NULL,
    "days" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "fulfilled_quantity" INTEGER NOT NULL DEFAULT 0,
    "investment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_market_id_investment_id_user_id_key" ON "transaction"("market_id", "investment_id", "user_id");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_investment_id_fkey" FOREIGN KEY ("investment_id") REFERENCES "investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
