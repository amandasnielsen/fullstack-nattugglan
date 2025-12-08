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
	name: string;
	phoneNumber: string;
	totalPrice: number;
	items: CartItem[];
	createdAt: string;
}
