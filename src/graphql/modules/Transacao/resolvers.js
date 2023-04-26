import { transacaoDb } from "../../../db/transacaoDb.js";
import { notificacaoDb } from '../../../db/notificacaoDb.js';

const resolvers = {
  Query : {
    transacoesUsuario : (_, { idUsuario }) => transacaoDb.getByUsuario(idUsuario)
  },

  Mutation: {
    async realizarTransacao(_, {data}) {
      const novaTransacao = await transacaoDb.realizarTransacao(data);
    
      if (!!novaTransacao){
        const novaNotificacao = notificacaoDb.enviarNotificacao(
          novaTransacao.descricao, 
          novaTransacao.idEmissor, 
          novaTransacao.idReceptor
        );
      
        if (!!novaNotificacao){
          return novaTransacao;
        }

        console.log(novaNotificacao);
      }
      return null;
    },

    async confirmarTransacao(_, { idTransacao }){
      return transacaoDb.confirmarTransacao(idTransacao);
    }
  }
};

export default { resolvers };