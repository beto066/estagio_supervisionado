/*
  Warnings:

  - A unique constraint covering the columns `[idNotificao]` on the table `Contatos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idNotificacao]` on the table `Transacoes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idNotificao` to the `Contatos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNotificacao` to the `Transacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contatos" ADD COLUMN     "idNotificao" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transacoes" ADD COLUMN     "idNotificacao" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contatos_idNotificao_key" ON "Contatos"("idNotificao");

-- CreateIndex
CREATE UNIQUE INDEX "Transacoes_idNotificacao_key" ON "Transacoes"("idNotificacao");

-- AddForeignKey
ALTER TABLE "Transacoes" ADD CONSTRAINT "Transacoes_idNotificacao_fkey" FOREIGN KEY ("idNotificacao") REFERENCES "Notificacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contatos" ADD CONSTRAINT "Contatos_idNotificao_fkey" FOREIGN KEY ("idNotificao") REFERENCES "Notificacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
