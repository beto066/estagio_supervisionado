import { perfilDb } from "../../../db/perfilDb.js";

const resolvers = {
  Query : {
    perfis :() => perfilDb.getAll(),
  }
}

export default { resolvers };