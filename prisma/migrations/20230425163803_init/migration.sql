/*
  Warnings:

  - Added the required column `idEmissor` to the `Notificacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idReceptor` to the `Notificacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notificacao" ADD COLUMN     "idEmissor" INTEGER NOT NULL,
ADD COLUMN     "idReceptor" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_idEmissor_fkey" FOREIGN KEY ("idEmissor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_idReceptor_fkey" FOREIGN KEY ("idReceptor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
