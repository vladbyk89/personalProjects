import mongoose, { Schema } from "mongoose";

export interface UserInterface {
  _id: string;
}

export const UserSchema: Schema = new Schema(
  {
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

export default mongoose.model<UserInterface>("User", UserSchema);
