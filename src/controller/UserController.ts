import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { findUserByEmail } from "../repository/userRepository";
import { generateToken } from "../utils/generateToken";

const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
    generateToken(res, user._id)
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
  res.send("registerUser");
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly:true,
    expires: new Date(0)
  });

  res.status(200).json({message: 'Logged out successfully'})
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send("getUserProfile");
});

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send("updateUserProfile");
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.send("getUsers");
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
