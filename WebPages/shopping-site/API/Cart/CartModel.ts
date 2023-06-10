import mongoose, { Schema } from "mongoose";
import { CartProductInterface } from "../CartProduct/CartProductModel";
import { UserSchema } from "../User/UserModel";

export interface CartInterface {
  cartProducts: CartProductInterface[];
  user: string;
  _id: string;
}

export const CartSchema: Schema = new Schema(
  {
    cartProducts: {
      type: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }],
      required: true,
    },
    user: {
      type: UserSchema,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<CartInterface>("Cart", CartSchema);
