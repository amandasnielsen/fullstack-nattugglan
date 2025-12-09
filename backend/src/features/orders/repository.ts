import {
	OrderModel,
	OrderInterface,
	CartItem,
} from '../../core/database/models/order.model';

export interface NewOrderData {
	items: CartItem[];
	totalPrice: number;
	name: string;
	phoneNumber: string;
	orderNumber: string;
	guestId: string;
	createdAt: Date;
	status: 'Pending' | 'Confirmed' | 'Ready' | 'Delivered' | 'Cancelled';
}

export const createOrder = async (
	orderData: NewOrderData
): Promise<OrderInterface> => {
	const newOrder = new OrderModel(orderData);
	await newOrder.save();
	return newOrder;
};

export const findOrderById = async (
	orderNumber: string
): Promise<OrderInterface | null> => {
	return await OrderModel.findOne({ orderNumber });
};

export const findOrderByNameAndPhone = async (
	name: string,
	phoneNumber: string
): Promise<OrderInterface | null> => {
	return await OrderModel.findOne({ name, phoneNumber });
};

export const findAllOrders = async (): Promise<OrderInterface[]> => {
	return OrderModel.find().sort({ createdAt: -1 }).exec();
}