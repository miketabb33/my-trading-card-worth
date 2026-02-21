-- Rename profile table to user
ALTER TABLE "profile" RENAME TO "user";

-- Rename user_id column to external_id on user table
ALTER TABLE "user" RENAME COLUMN "user_id" TO "external_id";

-- Rename profile_id column to user_id on user_card table
ALTER TABLE "user_card" RENAME COLUMN "profile_id" TO "user_id";
