import { transacaoDb } from "../../../db/transacaoDb.js";
import { notificacaoDb } from '../../../db/notificacaoDb.js';

const resolvers = {
  Query : {
    transacoesUsuario : (_, { idUsuario }) => transacaoDb.getByUsuario(idUsuario)
  },

  Mutation: {
    async realizarTransacao(_, {data, usuario1}) {
      return await transacaoDb.realizarTransacao(data);
    },

    async confirmarTransacao(_, { idTransacao }){
      return transacaoDb.confirmarTransacao(idTransacao);
    }
  }
};

export default { resolvers };