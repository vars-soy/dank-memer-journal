/*
  Warnings:

  - A unique constraint covering the columns `[market_id,user_id]` on the table `investment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "investment_market_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "investment_market_id_user_id_key" ON "investment"("market_id", "user_id");
