import { GraphQLError, subscribe } from "graphql";
import { notificacaoDb } from "../../../db/notificacaoDb.js";
import { util } from '../../../util/index.js'

const resolvers = {
  Query : {
    notificacoesUsuario(_, args, contextValue){

      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      
      return notificacaoDb.getByReceptor(contextValue.user.id);
    },

    visualizarNotificacao(_, { id }, contextValue){
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      return notificacaoDb.visualizarNotificacao(id);
    }
  },

  Notificacao: {
    data(args){
      return args.data.toISOString();
    },
  },

  Subscription: {
    notificacaoCriada: {
      subscribe: (_, {}, contextValue) => {
        contextValue.pub.asyncIterator(['NOTIFICACAO_CRIADA']);
      }
    }
  }
};

export default { resolvers };