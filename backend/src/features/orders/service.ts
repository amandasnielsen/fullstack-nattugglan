import { v4 as uuidv4 } from 'uuid';
import {
	createOrder,
	findOrderById,
	findOrderByNameAndPhone,
	NewOrderData,
	findAllOrders as findAllOrdersRepo,
} from './repository';
import {
	OrderInterface, OrderModel,
	CartItem,
} from '../../core/database/models/order.model';



//input från frontend
export interface NewOrderInput {

	items: CartItem[];
	totalPrice: number;
	name: string;
	phoneNumber: string;
}

//place order
export const placeOrder = async (
	input: NewOrderInput
): Promise<OrderInterface> => {
	//generera ordernummer
	const orderNumber = uuidv4().slice(0, 5).toLocaleUpperCase();

	//kontrollera om de finns en tidigare order med samma name+phone
	let guestId: string;
	const existingOrder = await findOrderByNameAndPhone(
		input.name,
		input.phoneNumber
	);

	if (existingOrder) {
		guestId = existingOrder.guestId;
	} else {
		guestId = uuidv4().slice(0, 4).toLocaleUpperCase();
	}

	//skapa orderdata för mongoose
	const orderData: NewOrderData = {
		...input,
		phoneNumber: input.phoneNumber.replace(/\s+/g, ''),
		orderNumber,
		guestId,
		createdAt: new Date(),
		status: 'Pending',
	};

	//skapa och spara order
	const newOrder = await createOrder(orderData);
	return newOrder;
};

//hämta order via orderNumber
export const getOrderByID = async (orderNumber: string) => {
	return await findOrderById(orderNumber);
};

// hämta alla ordrar för admin
export const findAllOrders = async () => {
  return await findAllOrdersRepo();
};

export async function updateOrderStatus(orderNumber: string, status: string) {
  const allowed = ["Confirmed", "Ready", "Done", "Cancelled"];

  if (!allowed.includes(status)) {
    throw new Error("Invalid status");
  }

  const order = await OrderModel.findOneAndUpdate(
    { orderNumber },
    { status },
    { new: true }
  );

  return order;
}
