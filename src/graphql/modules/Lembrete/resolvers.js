import { lembreteDb } from '../../../db/lembreteDb.js';

const resolvers = {
  Query : {
    lembretesContato : (_, { idContato }) => lembreteDb.getByContato(idContato),
  }
}

export default { resolvers };
