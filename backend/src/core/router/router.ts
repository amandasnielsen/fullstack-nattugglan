
import { Router } from "express";
import { login } from "../../features/auth/controller";
import { getMenu } from "../../features/menu/controller";
import { requireApiKey } from "../middleware/apiKey";
import { requireAuth, requireAdmin } from "../middleware/auth";
import { UserModel } from "../database/models/user.model";
import { postOrder,getOrderDetails, putOrderStatus } from '../../features/orders/controller';



const router = Router();

//ADMIN ROUTES
router.put("/orders/:orderNumber", putOrderStatus);


router.post("/auth/login", login);
router.post("/menu", requireApiKey, requireAuth, requireAdmin);

//*DEBUGGING, RADERA * \\
router.get("/debug/users", async (req, res) => {
    const users = await UserModel.find();
    res.json(users);
  });

//USER ROUTES
router.get('/menu', getMenu);

//Orders
router.post('/order', postOrder);
router.get('/order/:orderNumber', getOrderDetails)




export default router;
