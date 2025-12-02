import { Router } from 'express';
import { postOrder } from './controller';

const router = Router();

router.post('/', postOrder);

export default router;
