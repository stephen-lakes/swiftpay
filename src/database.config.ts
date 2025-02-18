import path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity.ts";
import { Transaction } from "./entities/transaction.entity.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

export const connectionOptions: PostgresConnectionOptions = {
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize:
    process.env.DB_SYNCRHONIZE == "false" ? false : process.env.ENV == "dev",
  logging: false,
  entities: [User, Transaction],
  migrations: ["./migrations"],
  // entities: [path.join(__dirname, "src/**/*.entity{.ts,.js}")],
  // migrations: [path.join(__dirname, "src/**/*.migration{.ts,.js}")],
  subscribers: [path.join(__dirname, "src/**/*.subscriber{.ts,.js}")],
};

export const AppDataSource = new DataSource(connectionOptions);
