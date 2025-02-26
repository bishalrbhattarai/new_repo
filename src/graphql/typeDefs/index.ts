const typeDefs =`#graphql
type Post{
    id: Int!
    title: String!
    content: String!
    author: String!
}

 type PageInfo{
    hasNextPage: Boolean!
    endCursor: Int!
 }

 type PostConnection{
    edges: [PostEdge!]
    pageInfo:PageInfo!
 }


 type PostEdge {
    node:Post!
    cursor: Int!
 }

 type Query{
    posts(first:Int!, after:Int): PostConnection!
 }

`

export default typeDefs