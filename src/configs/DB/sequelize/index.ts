import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_LOCAL_HOST,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
});

export default sequelize;
