import { transacaoDb } from "../../../db/transacaoDb.js";
import { notificacaoDb } from '../../../db/notificacaoDb.js';
import { GraphQLError } from "graphql";

const resolvers = {
  Query : {
    async transacoesUsuario(args, { quant, pesquisa }, contextValue){
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      return transacaoDb.getByUsuario(contextValue.user.id, quant, pesquisa)
    },

    async transacoesComUsuario(_, { idUsuario }, contextValue){
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      return await transacaoDb.getByUsuarios(contextValue.user.id, idUsuario);
    },

    async findTransacao(_, { idTransacao }, contextValue){
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      return await transacaoDb.findTransacao(idTransacao);
    }
  },

  Transacao : {
    data(args){
      return args.data.toISOString();
    },

    remetente(args){
      if (args.valor < 0){
        return args.receptor;
      }
      return args.emissor;
    },

    destinatario(args){
      if (args.valor < 0){
        return args.emissor;
      }
      return args.receptor;
    },

    valor(args) {
      if (args.valor < 0){
        return args.valor * (-1);
      }
      return args.valor;
    }
  },

  Mutation: {
    async realizarTransacao(_, { data }, contextValue) {
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      var transacao = await transacaoDb.realizarTransacao(data, contextValue.user);

      if (transacao) {
        contextValue.pub.publish('NOTIFICACAO_CRIADA', {
          notificacaoCriada: transacao.notificacao
        });
      }

      return transacao;
    },

    async confirmarTransacao(_, { idTransacao }, contextValue){
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      return transacaoDb.confirmarTransacao(idTransacao);
    }
  }
};

export default { resolvers };