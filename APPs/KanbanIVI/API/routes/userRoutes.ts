import express from "express";
const userRouter = express.Router();
import {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controller/userController";

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/user").get(getUser);

userRouter.route("/:id").patch(updateUser).delete(deleteUser);

export { userRouter };
