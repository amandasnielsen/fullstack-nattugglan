import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("❌ Missing MONGODB_URI in .env file");
}

export async function connectDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("✔ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}
