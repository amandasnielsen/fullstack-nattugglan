import { apiFetch } from '@nattugglan/core/apiClient/apiClient';

interface OrderChangeProp {
	items: {
		_id: string;
		name: string;
		ingredients: string[];
		price: number;
		category: string;
		available: boolean;
		quantity: number;
	}[];
	totalPrice: number;
}

type StatusChange = {
	status: string;
	comment: string;
};

export const fetchOrderDetails = async (orderNumber: string) => {
	try {
		const data = await apiFetch(`/order/${orderNumber}`);

		return data;
	} catch (error) {
		console.error('Fel vid hämtning av orderdetaljer:', error);
		throw error;
	}
};

export default fetchOrderDetails;

export const patchOrderChange = async (
	orderNumber: string,
	payload: OrderChangeProp
) => {
	try {
		const data = await apiFetch(`/order/${orderNumber}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
		});

		return data;
	} catch (error) {
		console.error('Fel vid uppdatering av order', error);
		throw error;
	}
};

export const putStatusChange = async (
	orderNumber: string,
	payload: StatusChange
) => {
	try {
		const data = await apiFetch(`/orders/${orderNumber}`, {
			method: 'PUT',
			body: JSON.stringify(payload),
		});

		return data;
	} catch (error) {
		console.error('Fel vid uppdatering av order', error);
		throw error;
	}
};
