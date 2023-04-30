/*
  Warnings:

  - Added the required column `confirmado` to the `Contatos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contatos" ADD COLUMN     "confirmado" BOOLEAN NOT NULL;
