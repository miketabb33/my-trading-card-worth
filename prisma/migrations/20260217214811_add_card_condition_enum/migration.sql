/*
  Warnings:

  - Changed the type of `condition` on the `user_card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CardCondition" AS ENUM ('NEAR_MINT', 'LIGHTLY_PLAYED', 'MODERATELY_PLAYED', 'HEAVILY_PLAYED', 'DAMAGED');

-- AlterTable
ALTER TABLE "user_card" DROP COLUMN "condition",
ADD COLUMN     "condition" "CardCondition" NOT NULL;
