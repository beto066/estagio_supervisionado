import { notificacaoDb } from "../../../db/notificacaoDb.js";

const resolvers = {
  Query : {
    notificacoesUsuario(_, { idUsuario }){
      return notificacaoDb.getByReceptor(idUsuario);
    },
    visualizarNotificacao(_, { id }){
      return notificacaoDb.visualizarNotificacao(id);
    }
  }
};

export default { resolvers };