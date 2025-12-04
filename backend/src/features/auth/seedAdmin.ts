import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "../../core/database/models/user.model";
import { hashPassword } from "../../core/security/password";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

async function seedAdmin() {
  await mongoose.connect(uri as string);

  const username = "admin";
  const plainPassword = "admin123";

  const existing = await UserModel.findOne({ username });

  if (!existing) {
    const passwordHash = await hashPassword(plainPassword);
    await UserModel.create({ username, passwordHash, role: "admin" });
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }

  await mongoose.disconnect();
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
