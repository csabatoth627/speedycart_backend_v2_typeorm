import { AppDataSource } from "../config/data-source";
import { Repository } from "typeorm";
import { User } from "../entity/User";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const findUserByEmail = (userEmail: string): Promise<User | undefined> => {
  return userRepository.findOne({
    where: {
      email: userEmail,
    },
  });
};

const findUserWithoutPassword = (id: string): Promise<User | undefined> => {
  return userRepository.findOne({
    where: {
      _id: id,
    },
    select: ["_id", "name", "email", "isAdmin", "createdAt", "updatedAt"],
  });
};

export { findUserByEmail, findUserWithoutPassword };
