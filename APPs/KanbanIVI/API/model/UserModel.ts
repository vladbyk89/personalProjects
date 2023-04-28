import mongoose, { Schema } from "mongoose";
import { BoardSchema } from "./BoardModel";

interface UserInterface {
  firstName: string;
  lastName: string;
  gender: string;
  userName: string;
  password: string;
  email: string;
  boardList: [string];
  _id: string;
}

export const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    boardList: {
      type: [BoardSchema],
      // default: [],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<UserInterface>("User", UserSchema);
