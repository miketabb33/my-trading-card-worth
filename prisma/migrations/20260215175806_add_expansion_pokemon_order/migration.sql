-- CreateTable
CREATE TABLE "expansion_pokemon_order" (
    "id" SERIAL NOT NULL,
    "main_series" JSONB NOT NULL,
    "other_series" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expansion_pokemon_order_pkey" PRIMARY KEY ("id")
);
