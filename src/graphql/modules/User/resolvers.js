import { userDb } from "../../../db/userDb.js";
import { perfilDb } from "../../../db/perfilDb.js";
import { util } from '../../../util/index.js';

// console.log(util)

const resolvers = { 
  Query : {
    usuarios : userDb.usuarios,
    usuario : async (_, args) => await userDb.findById(args.id),
    pesquisaUsuario : async (_, { pesquisa }) => await userDb.searchByNomeOrEmail(pesquisa)
  },

  User : {
    async perfil(obj){
      return await perfilDb.getAll().find((p) => obj.perfil == p.id).descricao;
    }
  },

  Mutation : {
    cadastrarUsuario : async  (_, {data}) => await userDb.cadastrarUsuario(data),
    atualizarUsuario : async  (_, {id, data}) => await userDb.atualizarUsuario(id, data),
    deletarUsuario   : async  (_, {id}) => !!(await userDb.deletarUsuario(id)),
    editarSenha      : async  (_, {id, senha}) => await userDb.atualizarUsuario(id, { senha : util.getHash(senha) }),
    logar            :  (_, {id}) => util.getUsuarioLogadoTest(),
  }
};

export default { resolvers };