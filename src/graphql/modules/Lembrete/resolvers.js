import { lembreteDb } from '../../../db/lembreteDb.js';

const resolvers = {
  Query : {
    lembretesContato : (_, { idContato }) => lembreteDb.getByContato(idContato),
  },

  Mutation : {
    adcionarLembrete  : (_, { data }) => lembreteDb.adcionarLembrete(data),
    editarLembrete    : (_, { idLembrete, data }) => lembreteDb.editarLembrete(idLembrete, data),
    deletarLembrete   : (_, { idLembrete }) => !! lembreteDb.removerLembrete(idLembrete)
  }
}

export default { resolvers };
