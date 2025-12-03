import { Request } from 'express';
import { CartItem } from '../../core/database/models/order.model';

interface PaymentBody {
	items: CartItem[];
	totalPrice: number;
}

export const validateNewOrder = (body: any): PaymentBody => {
	const { items, totalPrice } = body;

	if (!items || !Array.isArray(items) || items.length === 0) {
		throw new Error('400: Kundkorgen är tom eller ogiltig');
	}

	if (typeof totalPrice !== 'number' || totalPrice <= 0) {
		throw new Error('400: Totaltpriset är ogiltig.');
	}

	return { items, totalPrice };
};
