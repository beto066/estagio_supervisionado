/*
  Warnings:

  - Made the column `perfil` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "perfil" SET NOT NULL,
ALTER COLUMN "perfil" SET DEFAULT 1;
