import { Router } from "express";
import { login } from "../../features/auth/controller";
import { getMenu } from "../../features/menu/controller";
import { requireApiKey } from "../middleware/apiKey";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/auth/login", requireApiKey, login);
router.get("/menu", requireApiKey, getMenu);
router.post("/menu", requireApiKey, requireAuth, requireAdmin, /* controller to create menu item */);

export default router;