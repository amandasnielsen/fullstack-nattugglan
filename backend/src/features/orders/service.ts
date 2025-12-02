import { v4 as uuidv4 } from 'uuid';
import { createOrder } from './repository';
import {
	OrderInterface,
	CartItem,
} from '../../core/database/models/order.model';

interface NewOrderInput {
	orderNumber: string;
	items: CartItem[];
	totalPrice: number;
}

export const placeOrder = async (
	input: NewOrderInput
): Promise<OrderInterface> => {
	const orderData = {
		...input,
		guestId: uuidv4(),
		createdAt: new Date(),
		status: 'Pending',
	};

	const orderDataForRepo: Omit<OrderInterface, '_id'> = orderData as Omit<
		OrderInterface,
		'_id'
	>;
	const newOrder = await createOrder(orderDataForRepo);

	return newOrder;
};
