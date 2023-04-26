-- AlterTable
ALTER TABLE "Contatos" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Lembretes" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Notificacoes" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Transacoes" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;
