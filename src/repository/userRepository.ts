import { AppDataSource } from "../config/data-source";
import { Repository } from "typeorm";
import { User } from "../entity/User";

const userRepository: Repository<User> = AppDataSource.getRepository(User);