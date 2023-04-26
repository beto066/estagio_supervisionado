import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from "graphql-tag";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { resolvers, typeDefs } from './src/graphql/modules/index.js'
import { db } from './src/db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname)

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
});

console.log(`🚀  Server ready at: ${url}`);