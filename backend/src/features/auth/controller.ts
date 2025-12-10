import { Request, Response } from "express";
import { login as loginService } from "./service";

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const result = await loginService(username, password);

    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { token, role } = result;
    res.json({ token, role }); 

  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Internal server error during login" });
  }
}

export function logout(req: Request, res: Response) {
  res.status(200).json({ message: "Logged out successfully" });
}