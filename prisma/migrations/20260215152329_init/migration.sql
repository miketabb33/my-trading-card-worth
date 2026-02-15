-- CreateEnum
CREATE TYPE "PokemonRarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'DOUBLE_RARE', 'ULTRA_RARE', 'ILLUSTRATION_RARE', 'SPECIAL_ILLUSTRATION_RARE', 'HYPER_RARE', 'SHINY_RARE', 'SHINY_ULTRA_RARE', 'ACE_SPEC_RARE');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('CARD_TRADER');

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expansion" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "set_code" TEXT,
    "image_url" TEXT,
    "number_of_cards" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expansion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expansion_pokemon" (
    "id" SERIAL NOT NULL,
    "expansion_id" INTEGER NOT NULL,
    "series" TEXT NOT NULL,
    "expansion_type" TEXT NOT NULL,
    "expansion_number_in_series" DOUBLE PRECISION NOT NULL,
    "number_of_secret_cards" INTEGER NOT NULL,
    "symbol_url" TEXT,
    "bulbapedia_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expansion_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_blueprint" (
    "id" SERIAL NOT NULL,
    "expansion_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "collector_number" TEXT NOT NULL,
    "image_show_url" TEXT NOT NULL,
    "image_preview_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_blueprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "nickname" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_blueprint_pokemon" (
    "id" SERIAL NOT NULL,
    "card_blueprint_id" INTEGER NOT NULL,
    "rarity" "PokemonRarity" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_blueprint_pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_blueprint_platform_link" (
    "id" SERIAL NOT NULL,
    "card_blueprint_id" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL,
    "external_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_blueprint_platform_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expansion_platform_link" (
    "id" SERIAL NOT NULL,
    "expansion_id" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL,
    "external_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expansion_platform_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_name_key" ON "game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "expansion_pokemon_expansion_id_key" ON "expansion_pokemon"("expansion_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "card_blueprint_pokemon_card_blueprint_id_key" ON "card_blueprint_pokemon"("card_blueprint_id");

-- CreateIndex
CREATE UNIQUE INDEX "card_blueprint_platform_link_card_blueprint_id_platform_key" ON "card_blueprint_platform_link"("card_blueprint_id", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "expansion_platform_link_expansion_id_platform_key" ON "expansion_platform_link"("expansion_id", "platform");

-- AddForeignKey
ALTER TABLE "expansion" ADD CONSTRAINT "expansion_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expansion_pokemon" ADD CONSTRAINT "expansion_pokemon_expansion_id_fkey" FOREIGN KEY ("expansion_id") REFERENCES "expansion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_blueprint" ADD CONSTRAINT "card_blueprint_expansion_id_fkey" FOREIGN KEY ("expansion_id") REFERENCES "expansion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_blueprint_pokemon" ADD CONSTRAINT "card_blueprint_pokemon_card_blueprint_id_fkey" FOREIGN KEY ("card_blueprint_id") REFERENCES "card_blueprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_blueprint_platform_link" ADD CONSTRAINT "card_blueprint_platform_link_card_blueprint_id_fkey" FOREIGN KEY ("card_blueprint_id") REFERENCES "card_blueprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expansion_platform_link" ADD CONSTRAINT "expansion_platform_link_expansion_id_fkey" FOREIGN KEY ("expansion_id") REFERENCES "expansion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
