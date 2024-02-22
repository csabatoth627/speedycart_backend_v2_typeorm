import * as express from "express";
import { getUsers, createUser } from "../controller/UserController";

const router = express.Router();

router.route('/').get(getUsers).post(createUser);

export { router as userRoutes };