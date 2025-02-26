// import { posts } from './graphql/resolvers';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import {Post, Role  ,User  } from './db/models';
import { GraphQLError } from 'graphql';




import resolvers from "./graphql/resolvers"
import typeDefs from "./graphql/typeDefs"

const startServer = async () => {
  try {

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();


(async()=>{
  try {

  // await Post.destroy({})

  } catch (error:any) {
    throw new Error(error)
  }

})