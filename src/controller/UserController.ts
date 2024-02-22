import { AppDataSource } from "../config/data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User)



const getUsers = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await userRepository.find();
        response.json(users);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export {getUsers}