import Role from "./role";
import User from "./user";

// 1 to M relationship 
/*
    User Role
    roleId on User Table
*/

Role.hasMany(User, {
    foreignKey:"roleId",
    as:"user"
})

User.belongsTo(Role,{
    foreignKey:"roleId",
    as:"role"
})

export {Role,User}