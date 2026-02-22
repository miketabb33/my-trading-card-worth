/*
  Warnings:

  - A unique constraint covering the columns `[expansion_id,name,collector_number]` on the table `card_blueprint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[game_id,name]` on the table `expansion` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "expansion_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "card_blueprint_expansion_id_name_collector_number_key" ON "card_blueprint"("expansion_id", "name", "collector_number");

-- CreateIndex
CREATE UNIQUE INDEX "expansion_game_id_name_key" ON "expansion"("game_id", "name");
