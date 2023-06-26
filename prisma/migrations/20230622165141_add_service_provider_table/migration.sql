/*
  Warnings:

  - A unique constraint covering the columns `[reset_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SERVICE_PROVIDER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "service_provider" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "service_provider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_reset_token_key" ON "users"("reset_token");

-- AddForeignKey
ALTER TABLE "service_provider" ADD CONSTRAINT "service_provider_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
