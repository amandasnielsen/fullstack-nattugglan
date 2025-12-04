import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" }
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
