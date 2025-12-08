import { Request, Response } from 'express';
import { handleNewOrder } from './handler';
import { getOrderByID, findAllOrders } from './service';
import { updateOrderStatus } from "./service";

interface OrderParams {
	orderNumber: string;
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
		const orderNumber: string = req.params.orderNumber;
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

export const putOrderStatus = async (
	req: Request<{ orderNumber: string }>,
	res: Response
  ) => {
	try {
	  const { orderNumber } = req.params;
	  const { status } = req.body;
  
	  const updated = await updateOrderStatus(orderNumber, status);
	  if (!updated) return res.status(404).json({ message: "Order not found" });
  
	  res.json(updated);
	} catch (err: any) {
	  res.status(400).json({ error: err.message });
	}
  };
  
