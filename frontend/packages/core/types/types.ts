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
	totalPrice: number;
	items: CartItem[];
	createdAt: string;
}
