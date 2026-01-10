/*
  Warnings:

  - Added the required column `remainingQuantity` to the `investment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'REMOVED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('SELL', 'BUY');

-- DropForeignKey
ALTER TABLE "investment" DROP CONSTRAINT "investment_user_id_fkey";

-- AlterTable
ALTER TABLE "investment" ADD COLUMN     "remainingQuantity" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "market_offer" (
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

    CONSTRAINT "market_offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_offer_market_id_investment_id_user_id_key" ON "market_offer"("market_id", "investment_id", "user_id");

-- AddForeignKey
ALTER TABLE "investment" ADD CONSTRAINT "investment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_offer" ADD CONSTRAINT "market_offer_investment_id_fkey" FOREIGN KEY ("investment_id") REFERENCES "investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_offer" ADD CONSTRAINT "market_offer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
