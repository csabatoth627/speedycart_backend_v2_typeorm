import { Request } from "express";
import { User } from "../entity/User";

export interface CustomRequest extends Request {
    user: User;
  }