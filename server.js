import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { resolvers, typeDefs } from './src/graphql/modules/index.js';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError : (err, formatError) => {
    if (err.message.startsWith(`Email já cadastrado: `)) {
      console.log(err.message);
      return { message : err.message};
    }
    return err;
  }
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },

  // context: async ({ req }) => {
  //   const token = req.headers.authorization || '';
  //   const user = await getUser(token);
  //   return { user };
  // }
});

console.log(`🚀  Server ready at: ${url}`);




