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

const createNewUser = (
  email: string,
  name: string,
  password: string
): Promise<User | undefined> => {
  const user: User = new User();
  user.email = email;
  user.name = name;
  user.password = password;
  return userRepository.save(user);
};

const getAllUser = (): Promise<User[]> => {
  return userRepository.find({
    select: ["_id", "name", "email", "isAdmin", "createdAt", "updatedAt"],
  });
};

const findUserById = (id: string): Promise<User | undefined> => {
  return userRepository.findOne({
    where: {
      _id: id,
    },
  });
};

export {
  findUserByEmail,
  findUserWithoutPassword,
  createNewUser,
  getAllUser,
  findUserById,
};
