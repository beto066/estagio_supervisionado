import { PrismaClient } from '@prisma/client';
import { util } from '../../src/util/index.js';

const transacaoDb = {
  async getByUsuario(idUsuario) {
    const prisma = new PrismaClient();

    return await prisma.transacoes.findMany({
      where : {
        OR : [
          { idEmissor : idUsuario },
          { idReceptor : idUsuario },
        ],
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
  
  async realizarTransacao(transacao) {
    const prisma = new PrismaClient();

    return await prisma.transacoes.create({
      data : {
        descricao : transacao.descricao,
        valor : transacao.valor,
        emissor : {
          connect : {
            id : transacao.idEmissor
          }
        },
        receptor : {
          connect : {
            id : transacao.idReceptor
          }
        },
        data : util.getDataNow(),
        notificacao : {
          create : {
            titulo : transacao.nomeEmissor + " solicitou uma transação",
            descricao : transacao.descricao,
            data : util.getDataNow(),
            idEmissor : transacao.idEmissor,
            idReceptor : transacao.idReceptor
          }
        }
      },
      include : {
        emissor : true ,
        receptor : true
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async confirmarTransacao(idTransacao){
    const prisma = new PrismaClient();

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

export { transacaoDb }