import { create } from 'zustand';
import type { orderDetailInterface } from '@nattugglan/orderconfirmationpage';

interface OrderState {
	orderNumber: string | null;
	guestId: string | null;
	previousOrders: orderDetailInterface[];
	isLoading: boolean;

	setGuestId: (id: string) => void;
	setOrderNumber: (orderNumber: string) => void;
	setPreviousOrders: (orders: orderDetailInterface[]) => void;
	setIsLoading: (loading: boolean) => void;

	fetchOrders: (name?: string, phoneNumber?: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
	orderNumber: null,
	guestId: null,
	previousOrders: [],
	isLoading: false,

	setGuestId: (id) => set({ guestId: id }),
	setOrderNumber: (orderNumber) => set({ orderNumber }),
	setPreviousOrders: (orders) => set({ previousOrders: orders }),
	setIsLoading: (loading) => set({ isLoading: loading }),

	fetchOrders: async (name, phoneNumber) => {
		set({ isLoading: true, previousOrders: [] });
		const currentGuestId = get().guestId;

		try {
			let response;

			if (currentGuestId) {
				response = await fetch(
					`http://localhost:3000/api/order/session?guestId=${currentGuestId}`
				);
			} else if (name && phoneNumber) {
				response = await fetch(`http://localhost:3000/api/order/lookup`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name, phoneNumber }),
				});
			} else {
				set({ isLoading: false });
				return;
			}

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Kunde inte hämta ordrar');
			}

			const data: orderDetailInterface[] = await response.json();

			if (data.length > 0) {
				if (!currentGuestId && name && phoneNumber) {
					const newGuestId = data[0].guestId;
					if (typeof newGuestId === 'string') {
						get().setGuestId(newGuestId);
						console.log(`gästen identifierad! Sparar guest id:, ${newGuestId}`);
					}
				}
				set({ previousOrders: data });
			} else {
				console.log('Hittade inga ordrar för denna identifiering.');
			}
		} catch (error) {
			console.error('Fel vid API-anrop:', error);
		} finally {
			set({ isLoading: false });
		}
	},
}));
