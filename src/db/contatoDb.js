import { util } from '../util/index.js';
import { prisma } from './index.js';

const contatoDb = {
  async getByUsuario(idUsuario) {
    return await prisma.contatos.findMany({
      where : {
        OR : [
          { idUser1 : idUsuario },
          { idUser2 : idUsuario },
        ],
        confirmado : true
      },
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
        },
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
        },
        lembretes : true
      },
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async pesquisaByEmailOrNomeUsuario(pesquisa, idUsuarioLogado){
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
                idUser1 : idUsuarioLogado
              }
            ] // AND
          }
        ], // OR
        confirmado : true
      },
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
        },
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
        },
      } // include
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async AdcionarContato(contato){
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