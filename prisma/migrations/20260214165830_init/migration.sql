-- CreateTable
CREATE TABLE "hello" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hello_pkey" PRIMARY KEY ("id")
);
