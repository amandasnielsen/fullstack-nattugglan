import { create } from 'zustand';
import type { orderDetailInterface } from '@nattugglan/orderconfirmationpage';
import { apiFetch } from '../apiClient/apiClient';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ActiveOrder {
	orderNumber: string;
	status: 'Pending' | 'Confirmed' | 'Ready' | 'Cancelled';
	[key: string]: any;
}

interface OrderState {
	orderNumber: string | null;
	guestId: string | null;
	previousOrders: orderDetailInterface[];
	isLoading: boolean;
	order: ActiveOrder | null;

	setGuestId: (id: string) => void;
	setOrderNumber: (orderNumber: string) => void;
	setPreviousOrders: (orders: orderDetailInterface[]) => void;
	setIsLoading: (loading: boolean) => void;
	setOrder: (order: ActiveOrder | null) => void;
	fetchOrders: (name?: string, phoneNumber?: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
	orderNumber: null,
	guestId: null,
	previousOrders: [],
	isLoading: false,
	order: null,

	setGuestId: (id) => set({ guestId: id }),
	setOrderNumber: (orderNumber) => set({ orderNumber }),
	setPreviousOrders: (orders) => set({ previousOrders: orders }),
	setIsLoading: (loading) => set({ isLoading: loading }),
	setOrder: (order) => set({ order }),
	fetchOrders: async (name, phoneNumber) => {
		set({ isLoading: true, previousOrders: [] });
		const currentGuestId = get().guestId;

		try {
			let data: orderDetailInterface[];

			if (currentGuestId) {
				data = await apiFetch(`/order/session?guestId=${currentGuestId}`);
			} else if (name && phoneNumber) {
				data = await apiFetch(`/order/lookup`, {
					method: 'POST',
					body: JSON.stringify({ name, phoneNumber }),
				});
			} else {
				set({ isLoading: false });
				return;
			}

			if (data.length > 0) {
				if (!currentGuestId && name && phoneNumber) {
					const newGuestId = data[0].guestId;
					if (typeof newGuestId === 'string') {
						get().setGuestId(newGuestId);
					}
				}
				set({ previousOrders: data });
			}
		} catch (error) {
			console.error('Fel vid API-anrop:', error);
		} finally {
			set({ isLoading: false });
		}
	},
}));
