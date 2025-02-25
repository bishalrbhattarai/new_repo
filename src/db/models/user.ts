import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/connection";

interface UserAttributes{
    id: number;
    name: string;
    email: string;
    age: number;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface UserInputAttribute{
    name: string;
    age: number;
    email: string;
    roleId: number;
}
 
class User extends Model<UserAttributes, UserInputAttribute> implements UserAttributes {
    id!: number;
    name!: string;
    email!: string;
    age!: number;
    roleId!: number;
    createdAt!: Date;
    updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
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
    tableName: 'Users',
    modelName:"Users"
});

export default User;