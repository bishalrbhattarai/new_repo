import Role from "./role";
import User from "./user";
import Post from "./post";

Role.hasMany(User, {
    foreignKey:"roleId",
    as:"user"
})

User.belongsTo(Role,{
    foreignKey:"roleId",
    as:"role"
})

export {Role,User,Post}