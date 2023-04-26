import { contatoDb } from '../../../db/contatoDb.js';
import { util } from '../../../util/index.js';

const resolvers = {
  Query : {
    contatosUsuario : (_, { idUsuario }) => contatoDb.getByUsuario(idUsuario),
    procurarContato : (_, { pesquisa }) =>contatoDb.pesquisaByEmailOrNomeUsuario(pesquisa, util.getUsuarioLogadoTest().id)
  },

  Contato : {
    usuario1 : (args) => args.user1,
    usuario2 : (args) => args.user2
  }

  // Mutation : {
  //   confirmarContato : => 
  // }
}

export default { resolvers };