import mongoose, { Schema } from "mongoose";
import {
  CartProductInterface,
  CartProductSchema,
} from "../CartProduct/CartProductModel";
import { UserInterface } from "../User/UserModel";

export interface CartInterface {
  cartProducts: CartProductInterface[];
  _id: string;
}

export const CartSchema: Schema = new Schema(
  {
    cartProducts: {
      type: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }],
      required: true,
    },
    // cartProducts: {
    //   type: [CartProductSchema],
    //   required: true,
    // },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<CartInterface>("Cart", CartSchema);
