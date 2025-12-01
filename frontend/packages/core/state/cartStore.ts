import { create } from 'zustand';
import type { MenuItem } from '../types/types';

export type CartItem = MenuItem & {
	quantity: number;
};

interface CartState {
	items: CartItem[];
	totalQuantity: number;
	totalPrice: number;

	addItem: (item: MenuItem) => void;
	removeItem: (_id: string) => void;
	updateItemQuantity: (_id: string, newQuantity: number) => void;
	clearCart: () => void;
}

// Beräkningsfunktioner
const calculateTotals = (items: CartItem[]) => {
	const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	return { totalQuantity, totalPrice };
};

// Skapa Zustands store
export const useCartStore = create<CartState>((set) => ({
	items: [],
	totalQuantity: 0,
	totalPrice: 0,

	// Lägg till en ny artikel eller öka antalet för en befintlig item
	addItem: (item) => {
		set((state) => {
			const existingItem = state.items.find((i) => i._id === item._id);
			let newItems: CartItem[];

			if (existingItem) {
				newItems = state.items.map((i) =>
					i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
				);
			} else {
				newItems = [...state.items, { ...item, quantity: 1 }];
			}
			return {
				items: newItems,
				...calculateTotals(newItems),
			};
		});
	},

	// Ta bort en artikel helt, eller minska antalet till noll
	removeItem: (_id) => {
		set((state) => {
			const existingItem = state.items.find((i) => i._id === _id);
			let newItems: CartItem[] = state.items;

			if (existingItem) {
				if (existingItem.quantity > 1) {
					newItems = state.items.map((i) =>
						i._id === _id ? { ...i, quantity: i.quantity - 1 } : i
					);
				} else {
					newItems = state.items.filter((i) => i._id !== _id);
				}
			}
			return {
				items: newItems,
				...calculateTotals(newItems),
			};
		});
	},

	// Uppdatera kvantitet direkt
	updateItemQuantity: (_id, newQuantity) => {
		set((state) => {
			let newItems: CartItem[];

			if (newQuantity <= 0) {
				newItems = state.items.filter((i) => i._id !== _id);
			} else {
				newItems = state.items.map((i) =>
					i._id === _id ? { ...i, quantity: newQuantity } : i
				);
			}

			return {
				items: newItems,
				...calculateTotals(newItems),
			};
		});
	},

	// tömmer hela varukorgen
	clearCart: () => {
		set(() => ({
			items: [],
			totalPrice: 0,
			totalQuantity: 0,
		}));
	},
}));
