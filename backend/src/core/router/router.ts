import { Router } from "express";
import { getMenu } from "../../features/menu/controller";



const router = Router();

router.get("/menu", getMenu);

export default router;
