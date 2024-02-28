import { Request , Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import { findUserWithoutPassword } from "../repository/userRepository";
import { User } from "../entity/User";
const jwt = require("jsonwebtoken");

interface CustomRequest extends Request {
  user?: User
}

const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        
        const user: User = await findUserWithoutPassword(decoded.userId);
        req.user = user ;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token ");
    }
  }
);

const admin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
