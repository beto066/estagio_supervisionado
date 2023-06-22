import { contatoDb } from '../../../db/contatoDb.js';
import { GraphQLError } from 'graphql';

const resolvers = {
  Query : {
    async contatosUsuario(_, {}, contextValue){
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      
      var contatos = await contatoDb.getByUsuario(contextValue.user.id);

      return contatos;
    },

    procurarContato (_, { pesquisa }, contextValue){
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      return contatoDb.pesquisaByEmailOrNomeUsuario(pesquisa, contextValue.user.id);
    }
  },

  Contato : { 
    outroUsuario(args, {}, contextValue){
      if (contextValue.user.id == args.user1.id){
        return args.user2;
      }

      return args.user1;
    },

    saldoComUsuario(args, {}, contextValue){
      var contato = args;

      var saldo = 0.0;

      if (contato.idUser1 == contextValue.user.id){
        contato.user1.traFeitas.forEach((transacao) => {
          if (transacao.idReceptor == contato.idUser2){
            saldo += transacao.valor
          }
        });

        contato.user1.treRecebidas.forEach((transacao) => {
          if (transacao.idEmissor == contato.idUser2){
            saldo -= transacao.valor
          }
        });

      } else {
        contato.user2.traFeitas.forEach((transacao) => {
          if (transacao.idReceptor == contato.idUser1){
            saldo += transacao.valor
          }
        });

        contato.user2.treRecebidas.forEach((transacao) => {
          if (transacao.idEmissor == contato.idUser1){
            saldo -= transacao.valor
          }
        });
      }

      return saldo;
    }
  },

  Mutation : {
    async confirmarContato(_, { idContato }, contextValue) {
      if (!contextValue.user){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      return contatoDb.confirmarContato(idContato);
    },
    negarContato     : async (_, { idContato }) => !!(await contatoDb.negarContato(idContato)),
    adcionarContato  : async (_, { data }) => contatoDb.AdcionarContato(data)
  }
}

export default { resolvers };