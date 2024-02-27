import { AppDataSource } from "../config/data-source";
import { Repository } from "typeorm";
import { User } from "../entity/User";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const findUserByEmail = (userEmail: string): Promise<User | undefined> => {
  return userRepository.findOne({
    select: {
      _id: true,
      name: true,
      email: true,
      isAdmin: true,
    },
    where: {
      email: userEmail,
    },
  });
};

export { findUserByEmail };
