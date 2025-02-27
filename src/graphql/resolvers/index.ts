import { Op } from 'sequelize';


// export const posts = Array.from({ length: 100 }, (_, index) => ({
//     id: index + 1,
//     title: `Post ${index + 1}`,
//     content: `This is the content of post ${index + 1}.`,
//     author: `Author ${index + 1}`
// }));

import { Post } from "../../db/models"
import { GraphQLError } from 'graphql';



const resolvers = {

    Query: {

        posts: async (__: ParentNode, { first, after }: { first: number, after?: number }) => {

            let limit = first || 5

            try {

               const posts = await Post.findAll({
                    where:{
                        id:{
                            [Op.gt]:after || 0
                        }
                    },
                    limit : limit +1
                })

                const hasNextPage = posts.length > limit

                const edges = hasNextPage ? posts.slice(0, -1) : posts

                const endCursor = edges[edges.length - 1].id

                return {
                    edges: edges.map((post: any) => ({
                        node: post,
                        cursor: post.id
                    }),
                    
                    
                    ),
                    pageInfo: {
                        hasNextPage,
                        endCursor
                    }
                }



            } catch (error: any) {
                throw new GraphQLError(error)
            }
        }
    }
}




export default resolvers