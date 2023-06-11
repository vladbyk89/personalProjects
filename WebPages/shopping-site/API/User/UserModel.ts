import mongoose, { Schema } from "mongoose";
import { CartSchema } from "../Cart/CartModel";

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
    cart: {
      type: CartSchema,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<UserInterface>("User", UserSchema);
