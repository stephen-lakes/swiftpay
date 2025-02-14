import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

import { User } from "../entities/user.entity.ts";
import path, { dirname } from "path";

const connectionOptions: PostgresConnectionOptions = {
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  // entities: ["../src/entities/*{.ts,.js}"],
  // migrations: ["src/migrations/*{.ts,.js}"],
  // migrations: [path.join(__dirname, "../migrations/*{.ts,.js}")],
  // "subscribers": ["src/subscriber/*.js"]
  entities: [User],
};
// Initialize DataSource
export const AppDataSource = new DataSource(connectionOptions);

// export default AppDataSource;
