import { Request, Response } from "express";
import { signToken } from "../../core/security/jwt";

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "admin123") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({
    userId: "admin",
    role: "admin",
  });

  res.json({ token });
}
