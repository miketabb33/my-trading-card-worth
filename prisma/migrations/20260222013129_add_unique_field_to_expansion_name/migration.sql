/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `expansion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" RENAME CONSTRAINT "profile_pkey" TO "user_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "expansion_name_key" ON "expansion"("name");

-- RenameForeignKey
ALTER TABLE "user_card" RENAME CONSTRAINT "user_card_profile_id_fkey" TO "user_card_user_id_fkey";

-- RenameIndex
ALTER INDEX "profile_user_id_key" RENAME TO "user_external_id_key";
