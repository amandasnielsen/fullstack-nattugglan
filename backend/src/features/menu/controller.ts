import { Request, Response } from "express";
import { listMenu } from "./service";

export async function getMenu(req: Request, res: Response) {
  const items = await listMenu();
  res.json(items);
}
