import { PrismaClient } from '@prisma/client';
import { util } from '../../src/util/index.js';

const prisma = new PrismaClient();

const notificacaoDb = {
  async getByReceptor(userId){
    return await prisma.notificacoes.findMany({
      where : {
        idReceptor : userId
      },
      include : {
        emissor : true,
        receptor : true
      }
    });
  },

  async enviarNotificacao(descricao, idEmissor, idReceptor) {
    return await prisma.notificacoes.create({
      data : {
        titulo : "O " + util.getUsuarioLogadoTest().nome + " solicitou uma transação",
        descricao : descricao,
        data : util.getDataNow(),
        idEmissor : idEmissor,
        idReceptor : idReceptor
      }
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
        receptor : true
      }
    });
  }
}

export { notificacaoDb };