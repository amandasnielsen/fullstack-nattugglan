import { v4 as uuidv4 } from 'uuid';
import { createOrder, findOrderById } from './repository';
import {
	OrderInterface,
	CartItem,
} from '../../core/database/models/order.model';

interface NewOrderInput {
	items: CartItem[];
	totalPrice: number;
}

export const placeOrder = async (
	input: NewOrderInput
): Promise<OrderInterface> => {
	const orderNumber = uuidv4().slice(0, 5).toLocaleUpperCase();
	const guestId = uuidv4().slice(0, 3).toLocaleUpperCase();

	const orderData = {
		...input,
		orderNumber: orderNumber,
		guestId: guestId,
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

export const getOrderByID = async (orderNumber: string) => {
	return await findOrderById(orderNumber);
};
