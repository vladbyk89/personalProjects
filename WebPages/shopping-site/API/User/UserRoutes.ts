import express from "express";
const userRouter = express.Router();

import { getAllUsers, createUser, getUser } from "./UserController";
import { setUserCookie } from "../middleware/userCookie";

userRouter.route("/").get(getAllUsers).post(createUser, setUserCookie);

userRouter.route("/getUser").get(getUser);

export default userRouter;
