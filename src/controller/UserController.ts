import { AppDataSource } from "../config/data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Product } from "../entity/Product";
const userRepository = AppDataSource.getRepository(Product)



const getUsers = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await userRepository.find({
            relations: {
                user: true,
            },
        });
        response.json(users);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

const createUser = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new User()
        user.name = "test"
        user.email = "tesssst@gmail.com"
        user.password = "123"

        await AppDataSource.manager.save(user)
        response.json(user)
        
    } catch (error) {
        response.status(500).json({ error: error.message });
    } 
    
}

const deleteUser = async(request: Request, response: Response, next: NextFunction) => {
    try { userRepository.delete({})
        response.status(200).json({message:"ddddddd"})
        
    } catch (error) {
        response.status(500).json({ error: error.message });
    } 
    
}

export {getUsers, createUser, deleteUser}