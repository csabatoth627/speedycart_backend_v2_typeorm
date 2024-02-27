import { Request as ExpressRequest, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import { findUserWithoutPassword } from "../repository/userRepository";
const jwt = require("jsonwebtoken");

interface MyRequest extends ExpressRequest {
  user?: any;
}

const protect = asyncHandler(
  async (req: MyRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await findUserWithoutPassword(decoded.userId);

        req.user = user;
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

const admin = (req: MyRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
