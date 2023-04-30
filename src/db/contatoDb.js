import { PrismaClient } from '@prisma/client';
import { util } from '../util/index.js';

const contatoDb = {
  async getByUsuario(idUsuario) {
    const prisma = new PrismaClient();

    return await prisma.contatos.findMany({
      where : {
        OR : [
          { idUser1 : idUsuario },
          { idUser2 : idUsuario },
        ],
      },
      include : {
        user1 : true,
        user2 : true,
        lembretes : true
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async pesquisaByEmailOrNomeUsuario(pesquisa, idUsuarioLogado){
    const prisma = new PrismaClient();

    return await prisma.contatos.findMany({
      where : {
        OR : [
          {
            AND : [
              {
                user1 : {
                  nome : {
                    contains: pesquisa,
                    mode: 'insensitive'
                  },
                }
              },
              {
                NOT : {
                  idUser1 : idUsuarioLogado
                } // NOT
              },
              {
                idUser2 : idUsuarioLogado
              }
            ] // AND
          },

          {
            AND : [
              {
                user2 : {
                  nome : {
                    contains: pesquisa,
                    mode: 'insensitive'
                  },
                }
              },
              {
                NOT : {
                  idUser2 : idUsuarioLogado
                } // NOT
              },
              {
                idUser2 : idUsuarioLogado
              }
            ] // AND
          }
        ], // OR
      },
      include : {
        user1 : true,
        user2 : true,
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async AdcionarContato(contato){
    const prisma = new PrismaClient();

    return await prisma.contatos.create({
      data : {
        user1 : {
          connect : {
            id : contato.idUsuario1
          }
        },
        user2 : {
          connect : {
            id : contato.idUsuario2
          }
        },
        notificacao : {
          create : {
            titulo : contato.nomeUsuario1 + " quer se tornar um dos seus contatos.",
            descricao : contato.descricao,
            data : util.getDataNow(),
            idEmissor : contato.idUsuario1,
            idReceptor : contato.idUsuario2
          }
        }
      },
      include : {
        user1 : true,
        user2 : true,
        lembretes : true
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async confirmarContato(idContato) {
    const prisma = new PrismaClient();

    return await prisma.contatos.update({
      where : {
        id : idContato
      },
      data : {
        confirmado : true
      },
      include : {
        user1 : true,
        user2 : true,
        lembretes : true
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async negarContato(idContato) {
    const prisma = new PrismaClient();

    return await prisma.contatos.update({
      where : {
        id : idContato
      },
      data  : {
        ativo : false
      },
      include : {
        user1 : true,
        user2 : true,
        lembretes : true
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },
};

export { contatoDb };