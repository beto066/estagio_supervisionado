import { userDb } from "../../../db/userDb.js";
import { perfilDb } from "../../../db/perfilDb.js";
import { util } from '../../../util/index.js';
import jwt from 'jsonwebtoken';
import { env } from "process";

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
    atualizarUsuario : async  (_, {id, data}) => await userDb.atualizarUsuario(id, data),
    deletarUsuario   : async  (_, {id}) => !!(await userDb.deletarUsuario(id)),
    editarSenha      : async  (_, {id, senha}) => await userDb.atualizarUsuario(id, { senha : util.getHash(senha) }),

    async cadastrarUsuario(_, {data, userName, senha}){
      const user = await userDb.cadastrarUsuario(data, userName, util.getHash(senha));

      if (user) {
        const token = jwt.sign(
          {
            id : user.id,
            nome : user.nome,
            email : user.email,
            perfil : perfilDb.getAll().find((p) => p == user.perfil)
          },
          process.env.SECRET_API
        );

        console.log(process.env.SECRET_API);

        return token;
      }
    },

    async logar(_, { userName, senha }){
      const user = await userDb.logar(userName, util.getHash(senha));

      if (user){
        const token = jwt.sign(
          {
            id : user.id,
            nome : user.nome,
            email : user.email,
            perfil : perfilDb.getAll().find((p) => p == user.perfil)
          },
          process.env.SECRET_API
        );
        
        return token;
      }
    }
  }
};

export default { resolvers };