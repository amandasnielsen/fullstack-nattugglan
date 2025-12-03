import { Router } from "express";
import { login } from "../../features/auth/controller";
import { getMenu } from "../../features/menu/controller";
import { requireApiKey } from "../middleware/apiKey";
import { requireAuth, requireAdmin } from "../middleware/auth";
import { UserModel } from "../database/models/user.model";

const router = Router();

router.post("/auth/login", requireApiKey, login);
router.get("/menu", requireApiKey, getMenu);
router.post("/menu", requireApiKey, requireAuth, requireAdmin);

router.get("/debug/users", async (req, res) => {
    const users = await UserModel.find();
    res.json(users);
  });

export default router;