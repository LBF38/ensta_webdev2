import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from
    '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './src/schema.js';
import { resolvers } from './src/resolvers.js';

const app = express();
const httpServer = createServer(app); const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
// Hand in the schema we just created and have the wsServer start listening
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

// You must call `start()` on the `ApolloServer` instance before passing the instance to `expressMiddleware`
await server.start();
// Specify the path where we'd like to mount our server
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));
const PORT = 4000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
