-- AlterTable
ALTER TABLE "user" RENAME CONSTRAINT "profile_pkey" TO "user_pkey";

-- RenameForeignKey
ALTER TABLE "user_card" RENAME CONSTRAINT "user_card_profile_id_fkey" TO "user_card_user_id_fkey";

-- RenameIndex
ALTER INDEX "profile_user_id_key" RENAME TO "user_external_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "card_blueprint_expansion_id_name_collector_number_key" ON "card_blueprint"("expansion_id", "name", "collector_number");

-- CreateIndex
CREATE UNIQUE INDEX "expansion_game_id_name_key" ON "expansion"("game_id", "name");
