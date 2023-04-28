import mongoose, { Schema } from "mongoose";

interface ListInterface {
  name: string;
  cardsArray: [string];
  _id: string;
}

export const ListSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cardsArray: {
      type: [String],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ListInterface>("List", ListSchema);
