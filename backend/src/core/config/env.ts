import dotenv from "dotenv";
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const JWT_SECRET = requireEnv("JWT_SECRET");
export const API_KEY = requireEnv("API_KEY");
export const MONGODB_URI = requireEnv("MONGODB_URI");
export const PORT = process.env.PORT || "3000";
