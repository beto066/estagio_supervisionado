-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(3) NOT NULL,
    "visualizado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);
