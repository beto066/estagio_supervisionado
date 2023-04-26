/*
  Warnings:

  - You are about to drop the `Lembrete` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lembrete" DROP CONSTRAINT "Lembrete_idContato_fkey";

-- DropTable
DROP TABLE "Lembrete";

-- CreateTable
CREATE TABLE "Lembretes" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "prioridade" BOOLEAN NOT NULL DEFAULT false,
    "idContato" INTEGER NOT NULL,

    CONSTRAINT "Lembretes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lembretes" ADD CONSTRAINT "Lembretes_idContato_fkey" FOREIGN KEY ("idContato") REFERENCES "Contatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
