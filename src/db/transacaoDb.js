import { PrismaClient } from '@prisma/client';
import { util } from '../../src/util/index.js';

const prisma = new PrismaClient();

const transacaoDb = {
  async getByUsuario(idUsuario) {
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
    });
  },
  
  async realizarTransacao(transacao) {
    return await prisma.transacoes.create({data : {
      ...transacao,
      idEmissor : transacao.idEmissor,
      idReceptor : transacao.idReceptor,
      data : util.getDataNow(),
    }});
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
    });
  },
}

export { transacaoDb }