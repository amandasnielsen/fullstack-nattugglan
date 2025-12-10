import { patchOrderChange } from '../../data/fetch.ts';
import { type CartItem } from '@nattugglan/core';

// Den befintliga funktionen med oförändrat namn
const updateOrder = async (orderNumber: string, items: CartItem[]) => {
	const totalPrice = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const payload = {
		items: items.map((item) => ({ ...item })),
		totalPrice,
	};

	return patchOrderChange(orderNumber, payload);
};

export { updateOrder };
