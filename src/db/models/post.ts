import { DataTypes, Model } from "sequelize";
import User from "./user";
import sequelize from "../../config/connection";

interface PostAttributes {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

interface PostInputAttribute {
    title: string;
    content: string;
    author: string;
}

class Post extends Model<PostAttributes, PostInputAttribute> implements PostAttributes {
    id!: number;
    title!: string;
    content!: string;
    author!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Posts',
    tableName: 'Posts',
});

export default Post;