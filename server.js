import apollo from 'apollo-server-express'
import { createServer } from 'http';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { resolvers, typeDefs } from './src/graphql/modules/index.js';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions';

const app = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const pub = new PubSub();

const serverCleanup = useServer(
  { schema,
    context: async (ctx, msg, args) => {
      console.log('sjfjk')
      return { ctx , pub };
    },
    onConnect: async (ctx) => {
      console.log('context');
      // Check authentication every time a client connects.
      if (tokenIsNotValid(ctx.connectionParams)) {
        // You can return false to close the connection  or throw an explicit error
        throw new Error('Auth token missing!');
      }
    },
    onDisconnect(ctx, code, reason) {
      console.log('Disconnected!');
    },
  },
  wsServer
);

const corsOptions = {
  origin: 'http://127.0.0.1:4000/graphql',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}

const server = new apollo.ApolloServer({
  schema,
  context: ({ req }) => { return { user: req.user, pub } },
  subscriptions: {
    keepAlive: 1000, // 10 seconds
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            console.log('arrpz');
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

app.all('/graphql', function (req, res, next){
  if (req.headers){
    if (req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1] || '';
    
      if(token !== "null"){
        try {
          const user = jwt.decode(token, process.env.SECRET)
          req.user = user;
        } catch(e) {
          console.error(e);
        }
      }
    }
  }

  next();
});

httpServer.listen({ port: 4000 });

// app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

// app.use('/graphql', cors(corsOptions), bodyParser.json());

await server.start();

server.applyMiddleware({ app, cors: false });
// context(async (req, res, next) => {
//   const token = req.headers['authorization'];
//   console.log(token);
//   if(token !== "null"){
//       try {
//           const currentUser = await jwt.decode(token, process.env.SECRET)
//           req.currentUser = currentUser
//       } catch(e) {
//           console.error(e);
//       }
//   }
//   next();
// });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req, res }) => {
//     if (!req.headers.authorization){
//       return null;
//     }

//     const token = req.headers.authorization.split(" ")[1] || '';

//     if (!!token){
//       const user = jwt_decode(token);
//       return { user };
//     }

//     return null;
//   },
// }).then();

// console.log(url + 'graphql');

