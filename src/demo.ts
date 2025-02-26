// const typeDefs = `#graphql
// type User{
//     id: ID!
//     name: String!
//     email: String!
//     roleId: Int!
//     age: Int!
//     role: Role!
//     createdAt: String!
//     updatedAt: String!
// }

// type Role{
//     id: ID!
//     roleType: String!
//     active: Boolean!
//     createdAt: String!
//     updatedAt: String!
// }



// input RoleInput{
//   roleType: String!
//   active: Boolean!
// }

// input UserInput{
//   name: String!
//   email: String!
//   roleId: Int!
//   age: Int!
// }

// type Mutation{
//   createRole(input:RoleInput):Role
//   createUser(input:UserInput):User
// }



// type PageInfo {
//   endCursor: String   # The cursor for the last item returned
//   hasNextPage: Boolean!  # Indicates if there are more pages
// } 

// type UserEdge {
//   cursor: String!   # The cursor for this specific user
//   node: User!       # The actual user data
// }

// type UserConnection {
//   edges: [UserEdge!]!   # A list of users and their cursors
//   pageInfo: PageInfo!   # Pagination information for the client
// }

// type Query {
//   users(first: Int!, after: String): UserConnection
// }


// `;

// // Encode the cursor (ID to Base64)
// const encodeCursor = (id: number) => Buffer.from(id.toString()).toString('base64');

// // Decode the cursor (Base64 back to ID)
// const decodeCursor = (cursor: string) => parseInt(Buffer.from(cursor, 'base64').toString('ascii'));


// interface RoleInputInterface {
//   name: string
//   email: string
//   roleId: number
//   age: number
// }



// interface Role{
//   id: string
//   roleType: string
//   active: boolean
//   createdAt: Date
//   updatedAt: Date
// }

// interface User{
//   id: string
//   name: string
//   roleId : number
//   email: string
//   age: number
//   role: Role
//   createdAt: Date
//   updatedAt: Date
// }
// interface RoleInputInterface{
//   roleType: string
//   active: boolean
// }


// interface UserInputInterface{
//   name: string
//   email: string
//   roleId: number
//   age: number
// }

// const resolvers = {
//   User:{
//       role:(parent:User)=> Roles.findByPk(parent.roleId)
//   },
//     Mutation:{
//       createUser:async(__:ParentNode,{input}:{input:UserInputInterface})=>{
//         try {
//          const createdUser = await Users.create(input)
//           return createdUser;
//         } catch (error:any) {
//           throw new GraphQLError(error)
//         }

//       },
//     createRole:async(__:ParentNode,{input}:{input:RoleInputInterface})=>{
//       try {

        

//         const createRole = await Roles.create(input);
//         return createRole;

//       } catch (error:any) {
//         throw new GraphQLError(error)
//       }
    
//     }

//     },
//     Query:{
//         users: async (_: any, { first, after }: { first: number; after?: string }) => {
//           try {
//             const limit = first;
            
//             // Create where clause based on ID cursor
//             const cursorCondition = after ? { 
//               id: { 
//                 [Op.gt]: decodeCursor(after) 
//               } 
//             } : {};
      
//             const users = await Users.findAll({
//               where: cursorCondition,
//               order: [['id', 'ASC']], // Order by ID instead of createdAt
//               limit: limit + 1,  // Get one extra to check for next page
//               include: [{ model: Roles, as: 'role' }],
//             });
      
//             const hasNextPage = users.length > limit;
//             const edges = users.slice(0, limit); // Remove the extra item
      
//             return {
//               edges: edges.map((user: any) => ({
//                 node: user,
//                 cursor: encodeCursor(user.id),
//               })),
//               pageInfo: {
//                 endCursor: edges.length > 0 ? encodeCursor(edges[edges.length - 1].id) : null,
//                 hasNextPage,
//               },
//             };
//           } catch (error: any) {
//             throw new GraphQLError(error.message);
//           }
//         },
//     },
//   };