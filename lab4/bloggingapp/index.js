import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//We need to define our schema and resolvers before executing the server.
const server = new ApolloServer({});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log('Server ready at: ${url}');
