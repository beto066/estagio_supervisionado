import { util } from '../../src/util/index.js';
import { prisma } from './index.js'

const transacaoDb = {
  async getByUsuario(idUsuario, quant, pesquisa) {
    return await prisma.transacoes.findMany({
      where : {
        AND : [
          {
            OR : [
              { idEmissor : idUsuario },
              { idReceptor : idUsuario },
            ],
          },
          {
            OR : [
              {
                AND : [
                  { idEmissor : idUsuario },
                  { 
                    receptor : {
                      nome : { 
                        contains : pesquisa,
                        mode: 'insensitive'
                      } 
                    },
                  }
                ],
              },
              {
                AND : [
                  { idReceptor : idUsuario },
                  { 
                    emissor : {
                      nome : { 
                        contains : pesquisa,
                        mode: 'insensitive'
                      } 
                    }
                  },
                ],
              },
              { 
                descricao : {
                  contains : pesquisa,
                  mode: 'insensitive'
                },
              }
            ]
          }
        ],
      },
      include : {
        emissor : true,
        receptor : true
      },
      orderBy : {
        data : 'asc'
      },
      take: quant,
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async getByUsuarios(idLogado, idUser2){
    return await prisma.transacoes.findMany({
      where : {
        AND : [
          {
            OR : [
              {
                AND : [
                  {
                    idEmissor : idLogado
                  },
                  {
                    idReceptor : idUser2
                  }
                ] // AND
              },
              {
                AND : [
                  {
                    idEmissor : idUser2
                  },
                  {
                    idReceptor : idLogado
                  }
                ] // AND
              },
            ] // OR
          },
          {
            confirmado : true
          }
        ]
      },
      include : {
        emissor : {
          select : {
            id : true,
            nome : true,
            email : true
          }
        },
        receptor : {
          select : {
            id : true,
            nome : true,
            email : true
          }
        }
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },
  
  async findTransacao(idTransacao) {
    return await prisma.transacoes.findUnique({
      where : {
        id : idTransacao,
      },
      include : {
        emissor : {
          select : {
            id : true,
            nome : true,
            email : true
          }
        },
        receptor : {
          select : {
            id : true,
            nome : true,
            email : true
          }
        }
      }
    });
  },

  async realizarTransacao(transacao, logado) {
    return await prisma.transacoes.create({
      data : {
        descricao : transacao.descricao,
        valor : transacao.valor,
        emissor : {
          connect : {
            id : logado.id
          }
        },
        receptor : {
          connect : {
            id : transacao.idReceptor
          }
        },
        data : (transacao.data? new Date(transacao.data) : util.getDataNow()),
        notificacao : {
          create : {
            titulo : logado.nome + " solicitou uma transação",
            descricao : transacao.descricao,
            data : util.getDataNow(),
            idEmissor : logado.id,
            idReceptor : transacao.idReceptor
          }
        }
      },
      include : {
        emissor : true ,
        receptor : true,
        notificacao: true,
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async confirmarTransacao(idTransacao){
    return await prisma.transacoes.update({
      where : {
        id : idTransacao,
      },
      data : {
        confirmado : true
      },
      include : {
        emissor : true,
        receptor : true
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },
}

export { transacaoDb };