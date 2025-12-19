import { Router } from 'express';
import { login, logout } from '../../features/auth/controller';
import { getMenu, updateItem } from '../../features/menu/controller';
import { requireApiKey } from '../middleware/apiKey';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { UserModel } from '../database/models/user.model';
import { getAllIngredients, getIngredientStock } from '../../features/ingredients/controller';
import {
  postOrder,
  getOrderDetails,
  putOrderStatus,
  patchOrder,
  getAllOrders,
  getOrderByGuestId,
  getOrderByNameAndPhone,
} from '../../features/orders/controller';

const router = Router();

//ADMIN ROUTES
router.put('/orders/:orderNumber', putOrderStatus);

router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/menu', requireApiKey, requireAuth, requireAdmin);

router.get('/admin/orders', requireAuth, requireAdmin, getAllOrders);
router.put('/admin/orders/:orderNumber/status', requireAuth, requireAdmin, putOrderStatus);
router.put('/admin/menu/:itemId', requireAuth, requireAdmin, updateItem);
router.get('/admin/ingredients', requireAuth, requireAdmin, getAllIngredients);
router.get('/admin/stock', requireAuth, requireAdmin, getIngredientStock);

//*DEBUGGING, RADERA * \\
router.get('/debug/users', async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

//USER ROUTES
router.get('/menu', getMenu);

//ORDERS
router.post('/order', postOrder);
router.post('/order/lookup', getOrderByNameAndPhone);
router.get('/order/session', getOrderByGuestId);
router.get('/order/:orderNumber', getOrderDetails);
router.patch('/order/:orderNumber', patchOrder);

export default router;