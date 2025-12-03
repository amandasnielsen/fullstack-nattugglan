import { Router } from 'express';
import { postOrder, getOrderDetails } from './controller';

const router = Router();

router.post('/', postOrder);
router.get('/:orderNumber', getOrderDetails);

export default router;
