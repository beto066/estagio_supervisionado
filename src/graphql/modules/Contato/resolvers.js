import { contatoDb } from '../../../db/contatoDb.js';

const resolvers = {
  Query : {
    contatosUsuario : (_, { idUsuario }) => contatoDb.getByUsuario(idUsuario),
    procurarContato : (_, { pesquisa }) => contatoDb.pesquisaByEmailOrNomeUsuario(pesquisa, user1)
  },

  Contato : {
    usuario1 : (args) => args.user1,
    usuario2 : (args) => args.user2
  },

  Mutation : {
    confirmarContato : async (_, { idContato }) => contatoDb.confirmarContato(idContato),
    negarContato     : async (_, { idContato }) => !!(await contatoDb.negarContato(idContato)),
    adcionarContato  : async (_, { data }) => contatoDb.AdcionarContato(data)
  }
}

export default { resolvers };