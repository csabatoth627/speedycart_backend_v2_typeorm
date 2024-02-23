import * as express from "express";
import { getUsers, createUser,deleteUser } from "../controller/UserController";

const router = express.Router();

router.route('/').get(getUsers).post(createUser).delete(deleteUser);

export { router as userRoutes };