require("dotenv").config();
const { DataSource } = require("typeorm");
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const UserEntity = require("../entities/user");


const connectionOptions: PostgresConnectionOptions = {
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  // entities: ["../src/entities/*{.ts,.js}"],
  // migrations: ["src/migrations/*{.ts,.js}"],
  // "subscribers": ["src/subscriber/*.js"]
  entities: [UserEntity],
};
// Initialize DataSource
const AppDataSource = new DataSource(connectionOptions);

module.exports = AppDataSource;
