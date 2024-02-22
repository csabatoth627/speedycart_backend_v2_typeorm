import * as express from "express";
import { getUsers } from "../controller/UserController";

const router = express.Router();

router.route('/').get(getUsers);

export { router as userRoutes };