/*
  Warnings:

  - Changed the type of `rarity` on the `card_blueprint_pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "card_blueprint_pokemon" DROP COLUMN "rarity",
ADD COLUMN     "rarity" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PokemonRarity";
