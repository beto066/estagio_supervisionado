import { loadFiles } from "@graphql-tools/load-files"

const typeDefs = await loadFiles('./**/*.gql');

const resolvers = await loadFiles('./**/resolvers.js');

export { typeDefs, resolvers }