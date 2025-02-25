import { DataTypes, Model } from "sequelize";
import User from "./user";
import sequelize from "../../config/connection";

interface RoleAttributes {
    id: number;
    roleType: string;
    active: boolean;
    users?: User[];
    createdAt: Date;
    updatedAt: Date;
}

interface RoleInputAttribute {
    roleType: string;
    active: boolean;
} 

class Role extends Model<RoleAttributes, RoleInputAttribute> implements RoleAttributes {
    id!: number;
    roleType!: string;
    active!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
    users!: User[];
}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    roleType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
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
    modelName: 'Roles',
    tableName: 'Roles',
});

export default Role;