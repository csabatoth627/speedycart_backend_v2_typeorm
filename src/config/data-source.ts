import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
import { User } from "../entity/User";
import { Product } from "../entity/Product";
import { Review } from "../entity/Review";

const PORT = parseInt(process.env.DB_PORT);
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_NAME;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Product, Review],
  migrations: [],
  subscribers: [],
});
