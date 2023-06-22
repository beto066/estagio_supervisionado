import { prisma } from './index.js';

const notificacaoDb = {
  async getByReceptor(userId){
    return await prisma.notificacoes.findMany({
      where : {
        idReceptor : userId
      },
      include : {
        emissor : true,
        receptor : true,
        transacao: true,
        contato: true
      },
      orderBy : {
        data : 'desc'
      },
    }).then(async (retorno) => {
      prisma.$disconnect();
      return retorno;
    });
  },

  async visualizarNotificacao(id){
    return await prisma.notificacoes.update({
      data : {
        visualizado : true
      },
      where : {
        id : id
      },
      include : {
        emissor : true,
        receptor : true,
        transacao: true,
        contato: {
          include : {
            user1 : {
              include : { 
                traFeitas : {
                  where : {
                    confirmado : true
                  }
                },
                treRecebidas : {
                  where : {
                    confirmado : true
                  }
                }
              }
            }, // user1
            user2 : {
              include : { 
                traFeitas : {
                  where : {
                    confirmado : true
                  }
                },
                treRecebidas : {
                  where : {
                    confirmado : true
                  }
                }
              }
            }, // userw
          } // include
        } //contato
      }
    }).then(async (retorno) => {
      prisma.$disconnect();
      return retorno;
    });
  }
}

export { notificacaoDb };