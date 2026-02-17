-- CreateTable
CREATE TABLE "user_card" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "card_blueprint_id" INTEGER NOT NULL,
    "condition" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_card_blueprint_id_fkey" FOREIGN KEY ("card_blueprint_id") REFERENCES "card_blueprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
