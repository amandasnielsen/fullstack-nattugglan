import { CartItem } from '../../core/database/models/order.model';

interface PaymentBody {
	items: CartItem[];
	totalPrice: number;
	name: string;
	phoneNumber: string;
}

export const validateNewOrder = (body: any): PaymentBody => {
	const { items, totalPrice, name, phoneNumber } = body;

	//Validerar items
	if (!items || !Array.isArray(items) || items.length === 0) {
		throw new Error('400: Kundkorgen är tom eller ogiltigt');
	}

	//validerar totalpriset
	if (typeof totalPrice !== 'number' || totalPrice <= 0) {
		throw new Error('400: Totaltpriset är ogiltigt.');
	}

	//validerar namnet
	if (
		!name ||
		typeof name !== 'string' ||
		!/^[A-Za-zÅÄÖåäö\- ]{2,}$/.test(name.trim())
	) {
		throw new Error('400: Namnet är ogiltigt');
	}

	//validerar telefonnummret
	const cleanedPhone =
		typeof phoneNumber === 'string' ? phoneNumber.replace(/\s+/g, '') : '';

	if (!cleanedPhone || !/^\+?[0-9]{7,15}$/.test(cleanedPhone)) {
		throw new Error('400: Telefonnummret är ogiltigt');
	}

	return { items, totalPrice, phoneNumber: cleanedPhone, name: name.trim() };
};
