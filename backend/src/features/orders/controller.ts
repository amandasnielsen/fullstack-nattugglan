import { Request, Response } from 'express';
import { handleNewOrder } from './handler';

export const postOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const newOrder = await handleNewOrder(req.body);

		res.status(201).json({
			message: 'Beställning skapad',
			orderNumber: newOrder.orderNumber,
			status: newOrder.status,
			orderId: newOrder._id,
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
