import { Request } from 'express';
import { CartItem } from '../../core/database/models/order.model';

interface PaymentBody {
	orderNumber: string;
	items: CartItem[];
	totalPrice: number;
}

export const validateNewOrder = (body: any): PaymentBody => {
	const { orderNumber, items, totalPrice } = body;

	if (!orderNumber || typeof orderNumber !== 'string') {
		throw new Error('400: Ordernummer saknas eller är otilgängligt');
	}

	if (!items || !Array.isArray(items) || items.length === 0) {
		throw new Error('400: Kundkorgen är tom eller ogiltig');
	}

	if (typeof totalPrice !== 'number' || totalPrice <= 0) {
		throw new Error('400: Totaltpriset är ogiltig.');
	}

	return { orderNumber, items, totalPrice };
};
