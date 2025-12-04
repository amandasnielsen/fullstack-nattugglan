import { placeOrder } from './service';
import { validateNewOrder } from './validation';
import { OrderInterface } from '../../core/database/models/order.model';

export const handleNewOrder = async (body: any): Promise<OrderInterface> => {
	const validateData = validateNewOrder(body);
	const newOrder = await placeOrder(validateData);

	return newOrder;
};
