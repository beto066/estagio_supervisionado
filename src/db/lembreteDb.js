import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const lembreteDb = {
  getByContato(idContato){
    return prisma.lembretes.findMany({
      where : {
        idContato : idContato,
      },
    });
  },
};

export { lembreteDb };