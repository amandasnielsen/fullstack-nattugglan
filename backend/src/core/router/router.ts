import { Router } from 'express';
import { getMenu } from '../../features/menu/controller';
import orderRoutes from '../../features/orders';

const router = Router();

router.get('/menu', getMenu);
router.use('/order', orderRoutes);

export default router;
