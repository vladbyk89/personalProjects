import express from "express";
const userRouter = express.Router();

import { getAllUsers, createUser, getUser } from "./UserController";

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser);


export default userRouter;
