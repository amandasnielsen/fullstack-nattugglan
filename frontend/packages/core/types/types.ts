import type { CartItem } from '@nattugglan/core';

export type MenuItem = {
	_id: string;
	name: string;
	ingredients: string[];
	price: number;
	category: string;
	available: boolean;
};

export interface OrderInterface {
	orderNumber: string;
	totalPrice: number;
	items: CartItem[];
	createdAt: string;
}
