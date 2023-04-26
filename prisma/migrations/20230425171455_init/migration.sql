-- AlterTable
ALTER TABLE "Transacoes" ALTER COLUMN "descricao" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Lembrete" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "prioridade" BOOLEAN NOT NULL DEFAULT false,
    "idContato" INTEGER NOT NULL,

    CONSTRAINT "Lembrete_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lembrete" ADD CONSTRAINT "Lembrete_idContato_fkey" FOREIGN KEY ("idContato") REFERENCES "Contatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
