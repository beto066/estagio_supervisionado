import { PrismaClient } from '@prisma/client';

const notificacaoDb = {
  async getByReceptor(userId){
    const prisma = new PrismaClient();

    return await prisma.notificacoes.findMany({
      where : {
        idReceptor : userId
      },
      include : {
        emissor : true,
        receptor : true
      }
    }).then(async (retorno) => {
      prisma.$disconnect();
      return retorno;
    });
  },

  async visualizarNotificacao(id){
    const prisma = new PrismaClient();

    return await prisma.notificacoes.update({
      data : {
        visualizado : true
      },
      where : {
        id : id
      },
      include : {
        emissor : true,
        receptor : true
      }
    }).then(async (retorno) => {
      prisma.$disconnect();
      return retorno;
    });
  }
}

export { notificacaoDb };