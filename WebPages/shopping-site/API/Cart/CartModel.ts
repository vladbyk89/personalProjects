import mongoose, { Schema } from "mongoose";
import { CartProductInterface } from "../CartProduct/CartProductModel";

export interface CartInterface {
  products: CartProductInterface[];
  buyer: string;
  _id: string;
}

export const CartSchema: Schema = new Schema(
  {
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }],
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<CartInterface>("Cart", CartSchema);
