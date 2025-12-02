import {
	OrderModel,
	OrderInterface,
} from '../../core/database/models/order.model';

export const createOrder = async (
	orderData: Omit<OrderInterface, '_id' | 'createdAt' | 'status'>
): Promise<OrderInterface> => {
	const newOrder = new OrderModel(orderData);
	await newOrder.save();
	return newOrder;
};
