/*
  Warnings:

  - You are about to drop the column `telefone` on the `Users` table. All the data in the column will be lost.
  - Added the required column `senha` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "telefone",
ADD COLUMN     "senha" TEXT NOT NULL;
