import { PrismaClient } from '@prisma/client';

const lembreteDb = {
  async getByContato(idContato){
    const prisma = new PrismaClient();

    return await prisma.lembretes.findMany({
      where : {
        idContato : idContato,
        ativo : true  
      },
      include : {
        contato : {
          select : {
            user1 :  true,
            user2 : true
          }
        },
      } 
    }).then(async (retorno) => {
      await prisma.$disconnect()
      return retorno;
    });
  },

  async adcionarLembrete(lembrete){
    const prisma = new PrismaClient();

    return await prisma.lembretes.create({
      data : {
        descricao : lembrete.descricao,
        prioridade : lembrete.prioridade,
        idContato : lembrete.idContato
      },
      include : {
        contato : {
          select : {
            user1 :  true,
            user2 : true
          }
        },
      } 
    }).then(async (retorno) => {
      await prisma.$disconnect()
      return retorno;
    });
  },

  async editarLembrete(idLembrete, lembrete) {
    const prisma = new PrismaClient();

    return await prisma.lembretes.update({
      where : {
        id : idLembrete
      },
      data : {
        descricao : lembrete.descricao,
        prioridade : lembrete.prioridade,
        idContato : lembrete.idContato
      },
      include : {
        contato : {
          select : {
            user1 :  true,
            user2 : true
          }
        },
      } 
    });
  },

  async removerLembrete(idLembrete) {
    const prisma = new PrismaClient();

    return await prisma.lembretes.update({
      where : {
        id : idLembrete
      },
      data : {
        ativo : false
      }
    });
  }
};

export { lembreteDb };