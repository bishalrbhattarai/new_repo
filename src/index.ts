import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {Role as Roles ,User as Users } from './db/models';
import { GraphQLError } from 'graphql';


const typeDefs = `#graphql
type User{
    id: ID!
    name: String!
    email: String!
    roleId: Int!
    age: Int!
    role: Role!
    createdAt: String!
    updatedAt: String!
}

type Role{
    id: ID!
    roleType: String!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
}



input RoleInput{
  roleType: String!
  active: Boolean!
}

input UserInput{
  name: String!
  email: String!
  roleId: Int!
  age: Int!
}

type Mutation{
  createRole(input:RoleInput):Role
  createUser(input:UserInput):User
}



type PageInfo {
  endCursor: String   # The cursor for the last item returned
  hasNextPage: Boolean!  # Indicates if there are more pages
} 

type UserEdge {
  cursor: String!   # The cursor for this specific user
  node: User!       # The actual user data
}

type UserConnection {
  edges: [UserEdge!]!   # A list of users and their cursors
  pageInfo: PageInfo!   # Pagination information for the client
}

type Query {

  # users:[User]
  users(first: Int!, after: String): UserConnection

}


`;

// Encode the cursor (Date to Base64)
const encodeCursor = (date: Date) => Buffer.from(date.toISOString()).toString('base64');

// Decode the cursor (Base64 back to Date)
const decodeCursor = (cursor: string) => new Date(Buffer.from(cursor, 'base64').toString('ascii'));



interface RoleInputInterface {
  name: string
  email: string
  roleId: number
  age: number
}



interface Role{
  id: string
  roleType: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

interface User{
  id: string
  name: string
  roleId : number
  email: string
  age: number
  role: Role
  createdAt: Date
  updatedAt: Date
}
interface RoleInputInterface{
  roleType: string
  active: boolean
}


interface UserInputInterface{
  name: string
  email: string
  roleId: number
  age: number
}

const resolvers = {
  User:{
      role:(parent:User)=> Roles.findByPk(parent.roleId)
  },
    Mutation:{
      createUser:async(__:ParentNode,{input}:{input:UserInputInterface})=>{
        try {
         const createdUser = await Users.create(input)
          return createdUser;
        } catch (error:any) {
          throw new GraphQLError(error)
        }

      },
    createRole:async(__:ParentNode,{input}:{input:RoleInputInterface})=>{
      try {

        

        const createRole = await Roles.create(input);
        return createRole;

      } catch (error:any) {
        throw new GraphQLError(error)
      }
    
    }

    },
    Query:{
        // users: async () =>{
        //   try {
            
        //     const users =  await Users.findAll({
        //         include: [
        //           {
        //             model: Roles,
        //             as: "role"
        //           }
        //         ] 
        //       })
        //       return users

        //   } catch (error:any) {
        //     throw new GraphQLError(error);
        //   }
        // } 

        users: async (_: any, { first, after }: { first: number; after?: string }) => {
          try {
            const limit = first;  // How many users to return
            const cursorCondition = after ? { createdAt: { $gt: decodeCursor(after) } } : {};
      
            const users = await Users.findAll({
              where: cursorCondition,
              order: [['createdAt', 'ASC']], // Order by createdAt for consistency
              limit: limit + 1,  // Fetch one extra to check if there's a next page
              include: [{ model: Roles, as: 'role' }],
            });
      
            const hasNextPage = users.length > limit;
            const edges = hasNextPage ? users.slice(0, -1) : users;
      
            return {
              edges: edges.map((user: any) => ({
                node: user,
                cursor: encodeCursor(user.createdAt),
              })),
              pageInfo: {
                endCursor: edges.length > 0 ? encodeCursor(edges[edges.length - 1].createdAt) : null,
                hasNextPage,
              },
            };
          } catch (error: any) {
            throw new GraphQLError(error.message);
          }
        },
    },

 
  };
  const startServer = async () => {
      const server = new ApolloServer({
        typeDefs,
        resolvers,
      });
      
      const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
      
      console.log(`🚀  Server ready at: ${url}`);
}




startServer();