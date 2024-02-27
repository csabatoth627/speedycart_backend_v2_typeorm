import { AppDataSource } from "../config/data-source";
import { Repository } from "typeorm";
import { User } from "../entity/User";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const authenticate = async (
  userEmail: string,
  userPassword: string
): Promise<User> => {
  const user: User = await userRepository.findOne({
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

  return user;
};


export {authenticate}
