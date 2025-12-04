import { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("Missing API_KEY");
}

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key");
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }
  next();
}
