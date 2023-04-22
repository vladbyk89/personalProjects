import mongoose, { Schema } from "mongoose";

interface User {
  name: string;
  _id: string;
//   courses: [string];
}

export const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<User>("User", UserSchema);
