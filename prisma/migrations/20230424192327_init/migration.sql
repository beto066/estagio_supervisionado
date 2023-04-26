-- AlterTable
ALTER TABLE "User" ADD COLUMN     "perfilId" INTEGER;

-- CreateTable
CREATE TABLE "Perfil" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;
