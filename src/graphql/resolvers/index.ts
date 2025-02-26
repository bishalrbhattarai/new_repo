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

            let limit = first

            try {

                


            } catch (error: any) {
                throw new GraphQLError(error)
            }
        }
    }
}




export default resolvers