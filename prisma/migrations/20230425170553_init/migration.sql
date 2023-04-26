/*
  Warnings:

  - You are about to drop the `Notificacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notificacao" DROP CONSTRAINT "Notificacao_idEmissor_fkey";

-- DropForeignKey
ALTER TABLE "Notificacao" DROP CONSTRAINT "Notificacao_idReceptor_fkey";

-- DropTable
DROP TABLE "Notificacao";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "perfil" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacoes" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(3) NOT NULL,
    "visualizado" BOOLEAN NOT NULL DEFAULT false,
    "idEmissor" INTEGER NOT NULL,
    "idReceptor" INTEGER NOT NULL,

    CONSTRAINT "Notificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacoes" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "confirmado" BOOLEAN NOT NULL DEFAULT false,
    "data" TIMESTAMP(3) NOT NULL,
    "idEmissor" INTEGER NOT NULL,
    "idReceptor" INTEGER NOT NULL,

    CONSTRAINT "Transacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contatos" (
    "id" SERIAL NOT NULL,
    "idUser1" INTEGER NOT NULL,
    "idUser2" INTEGER NOT NULL,

    CONSTRAINT "Contatos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Notificacoes" ADD CONSTRAINT "Notificacoes_idEmissor_fkey" FOREIGN KEY ("idEmissor") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacoes" ADD CONSTRAINT "Notificacoes_idReceptor_fkey" FOREIGN KEY ("idReceptor") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacoes" ADD CONSTRAINT "Transacoes_idEmissor_fkey" FOREIGN KEY ("idEmissor") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacoes" ADD CONSTRAINT "Transacoes_idReceptor_fkey" FOREIGN KEY ("idReceptor") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contatos" ADD CONSTRAINT "Contatos_idUser1_fkey" FOREIGN KEY ("idUser1") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contatos" ADD CONSTRAINT "Contatos_idUser2_fkey" FOREIGN KEY ("idUser2") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
