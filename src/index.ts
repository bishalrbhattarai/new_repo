import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {Role as Roles ,User as Users } from './db/models';

  // export const users = [
  //   { id: 1, name: "John Doe", email: "john@example.com", age: 30, roleId: 1, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 2, name: "Jane Smith", email: "jane@example.com", age: 28, roleId: 2, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 3, name: "Michael Johnson", email: "michael@example.com", age: 35, roleId: 3, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 4, name: "Emily Brown", email: "emily@example.com", age: 27, roleId: 4, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 5, name: "David Wilson", email: "david@example.com", age: 32, roleId: 5, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 6, name: "Sarah Davis", email: "sarah@example.com", age: 29, roleId: 6, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 7, name: "James Miller", email: "james@example.com", age: 31, roleId: 7, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 8, name: "Lisa Anderson", email: "lisa@example.com", age: 33, roleId: 8, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 9, name: "Robert Taylor", email: "robert@example.com", age: 34, roleId: 9, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 10, name: "Jennifer Martinez", email: "jennifer@example.com", age: 26, roleId: 10, createdAt: new Date(), updatedAt: new Date() }
  // ];
  
  // export const roles = [
  //   { id: 1, roleType: "SUPER_ADMIN", active: true, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 2, roleType: "ADMIN", active: true, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 3, roleType: "MANAGER", active: true, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 4, roleType: "TEAM_LEAD", active: true, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 5, roleType: "SENIOR_DEVELOPER", active: true, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 6, roleType: "DEVELOPER", active: true, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 7, roleType: "JUNIOR_DEVELOPER", active: false, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 8, roleType: "QA_ENGINEER", active: true, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 9, roleType: "DESIGNER", active: true, createdAt: new Date(), updatedAt: new Date() },
  //   { id: 10, roleType: "GUEST", active: false, createdAt: new Date(), updatedAt: new Date() }
  // ];

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

type Query {
  users:[User]
}

`;

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

const resolvers = {
    Query:{
        users: async () =>{
          try {
            
              await Users.findAll({
                include: [
                  {
                    model: Roles,
                    as: "role"
                  }
                ] 
              })

          } catch (error:any) {
            throw new Error(error);
          }
        } 
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