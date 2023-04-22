import mongoose, { Schema } from "mongoose";
import UserSchema from "./UserModel";

interface Board {
  name: string;
  _id: string;
}

export const BoardSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    userList: {
      type: [UserSchema],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<Board>("Board", BoardSchema);
