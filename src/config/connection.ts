import { Dialect, Sequelize } from "sequelize";
import { config } from "dotenv";
config();
const sequelize = new Sequelize(<string>process.env.DB_NAME, <string>process.env.DB_USER, <string>process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:(process.env.DIALECT || "postgres") as Dialect,
    port:process.env.DB_PORT as unknown as number
});
export default sequelize;
