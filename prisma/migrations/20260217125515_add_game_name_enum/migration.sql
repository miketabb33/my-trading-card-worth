-- CreateEnum
CREATE TYPE "GameName" AS ENUM ('Pokemon', 'Lorcana');

-- AlterTable: convert text column to enum (preserves existing data)
ALTER TABLE "game" ALTER COLUMN "name" TYPE "GameName" USING "name"::"GameName";
