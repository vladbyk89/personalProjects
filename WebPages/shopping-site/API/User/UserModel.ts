import mongoose, { Schema } from "mongoose";
import { CartInterface } from "../Cart/CartModel";

export interface UserInterface {
  userName: string;
  password: string;
  cart: CartInterface[];
  _id: string;
}

export const UserSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
      required: true,
    },
    purchases: {
      type: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<UserInterface>("User", UserSchema);
