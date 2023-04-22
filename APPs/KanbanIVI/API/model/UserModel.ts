import mongoose, { Schema } from "mongoose";

interface User {
  name: string;
  userName: string;
  password: string;
  _id: string;
}

export const UserSchema: Schema = new Schema(
  {
    name: {
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
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<User>("User", UserSchema);
