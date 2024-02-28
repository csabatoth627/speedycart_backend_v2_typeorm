import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  findUserByEmail,
  createNewUser,
  getAllUser,
  findUserById,
  saveUserProfile,
} from "../repository/userRepository";
import { generateToken } from "../utils/generateToken";
import { User } from "../entity/User";
import { CustomRequest } from "../interfaces/CustomRequest";
import { log } from "console";

const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: User = await findUserByEmail(email);
  generateToken(res, user._id);
  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const userExist: User = await findUserByEmail(email);

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user: User = await createNewUser(email, name, password);
  generateToken(res, user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getUserProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await findUserById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

const updateUserProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const updatedUser: User = await saveUserProfile(req);

    if (updatedUser) {
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  }
);

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users: User[] = await getAllUser();
  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("deleteUser");
});
const getUserByID = asyncHandler(async (req: Request, res: Response) => {
  res.send("getUserByID");
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("updateUser");
});

export {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
