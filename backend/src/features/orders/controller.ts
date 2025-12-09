import { Request, Response } from 'express';
import { handleNewOrder } from './handler';
import {
	getOrderByID,
	findAllOrders,
	updateOrderStatus,
	updateOrderbyId,
} from './service';
import {
	findAllOrdersByGuestId,
	findAllOrdersByNameAndPhone,
} from './repository';

interface OrderParams {
	orderNumber?: string;
	guestId?: string;
}

export const getAllOrders = async (req: Request, res: Response) => {
	try {
		const orders = await findAllOrders();
		res.status(200).json(orders);
	} catch (error: any) {
		console.error('Fel vid GET /admin/orders:', error);
		res.status(500).json({
			message: 'Kunde inte hämta beställningar',
			error: 'FETCH_ORDERS_FAILED',
		});
	}
};

export const postOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const newOrder = await handleNewOrder(req.body);

		res.status(201).json({
			message: 'Beställning skapad',
			orderNumber: newOrder.orderNumber,
			guestId: newOrder.guestId,
			name: newOrder.name,
			phoneNumber: newOrder.phoneNumber,
			status: newOrder.status,
			order: newOrder.items,
		});
	} catch (error: any) {
		console.error('Fel vid POST /orders:', error);

		const errorMessage: any = error.message || 'Ett oväntat serverfel uppstod';
		const statusCode = errorMessage.includes('400') ? 400 : 500;

		res.status(statusCode).json({
			message: errorMessage.replace('400: ', ''),
			error: 'ORDER_CREATION_FAILED',
		});
	}
};

export const getOrderDetails = async (
	req: Request<OrderParams>,
	res: Response
) => {
	try {
		const orderNumber = req.params.orderNumber;
		if (orderNumber === undefined || orderNumber === '')
			return res.status(404).json({ message: 'Order not found' });

		const order = await getOrderByID(orderNumber);
		if (!order) return res.status(404).json({ message: 'Order not found' });

		res.status(200).json(order);
	} catch (error: any) {
		console.error('Fel vid GET /orders:', error);

		const errorMessage: any = error.message || 'Ett oväntat serverfel uppstod';
		const statusCode = errorMessage.includes('400') ? 400 : 500;

		res.status(statusCode).json({
			message: errorMessage.replace('400: ', ''),
			error: 'ORDER_CREATION_FAILED',
		});
	}
};

export const getOrderByGuestId = async (
	req: Request<OrderParams>,
	res: Response
) => {
	const { guestId } = req.query as { guestId: string | undefined };

	if (!guestId || typeof guestId !== 'string')
		return res.status(400).json({ message: 'Guest ID saknas' });

	try {
		const orders = await findAllOrdersByGuestId(guestId);
		return res.status(200).json(orders);
	} catch (error) {
		console.error('Fel vid hämtning av ordrar:', error);
		return res
			.status(500)
			.json({ message: 'Internt serverfel vid hämtning av ordrar' });
	}
};
export const getOrderByNameAndPhone = async (
	req: Request<OrderParams>,
	res: Response
) => {
	const { name, phoneNumber } = req.body;
	console.log('namn:', name, 'number:', phoneNumber);
	if (!name || !phoneNumber)
		return res.status(400).json({ message: 'Namn eller telefonnummer saknas' });

	try {
		const orders = await findAllOrdersByNameAndPhone(name, phoneNumber);
		return res.status(200).json(orders);
	} catch (error) {
		console.error('Fel vid hämtning av ordrar:', error);
		return res
			.status(500)
			.json({ message: 'Internt serverfel vid hämtning av ordrar' });
	}
};

export const patchOrder = async (req: Request<OrderParams>, res: Response) => {
	try {
		const { orderNumber } = req.params;
		if (!orderNumber)
			return res.status(400).json({ message: 'OrderNumber saknas' });

		const updateData = req.body;

		const updatedOrder = await updateOrderbyId(orderNumber, updateData);

		res.status(200).json({
			message: 'Order uppdaterad',
			order: updatedOrder,
		});
	} catch (error: any) {
		console.error('Fel vid PATCH /orders/:ordernumber:', error);
		res.status(500).json({ message: 'Kunde inte uppdatera ordern', error });
	}
};

export const putOrderStatus = async (
	req: Request<{ orderNumber: string }>,
	res: Response
) => {
	try {
		const { orderNumber } = req.params;
		const { status, comment } = req.body;

		const updated = await updateOrderStatus(orderNumber, status, comment);
		if (!updated) return res.status(404).json({ message: 'Order not found' });

		res.json(updated);
	} catch (err: any) {
		res.status(400).json({ error: err.message });
	}
};
