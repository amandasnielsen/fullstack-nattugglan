import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

interface TokenPayload {
  userId: string;
  role: "admin" | "user";
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
