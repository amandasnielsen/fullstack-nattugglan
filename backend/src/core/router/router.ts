
import { Router } from "express";
import { login } from "../../features/auth/controller";
import { getMenu } from "../../features/menu/controller";
import { requireApiKey } from "../middleware/apiKey";
import { requireAuth, requireAdmin } from "../middleware/auth";
import { UserModel } from "../database/models/user.model";

const router = Router();

//ADMIN ROUTES

router.post("/auth/login", requireApiKey, login);
router.get("/menu", requireApiKey, getMenu);
router.post("/menu", requireApiKey, requireAuth, requireAdmin);

//*DEBUGGING, RADERA * \\
router.get("/debug/users", async (req, res) => {
    const users = await UserModel.find();
    res.json(users);
  });

//USER ROUTES
router.get('/menu', getMenu);
router.use('/order', orderRoutes);


export default router;