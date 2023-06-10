import mongoose, { Schema } from "mongoose";
import { ProductInterface } from "../Product/ProductModel";

export interface CartProductInterface {
  product: ProductInterface;
  amount: number;
  _id: string;
}

export const CartProductSchema: Schema = new Schema(
  {
    product: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<CartProductInterface>(
  "CartProduct",
  CartProductSchema
);
