const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
		const URL = `${BASE_URL}/api/order/${orderNumber}`;

		const response = await fetch(URL);

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error('Ordern finns inte');
			}
			throw new Error('Kunde inte hämta order');
		}

		return await response.json();
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
		const response = await fetch(
			`${BASE_URL}/api/order/${orderNumber}`,
			{
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) throw new Error('Kunde inte uppdatera ordern');
		return response.json();
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
		const response = await fetch(
			`${BASE_URL}/api/orders/${orderNumber}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) throw new Error('Kunde inte uppdatera status på ordern');
		return response.json();
	} catch (error) {
		console.error('Fel vid uppdatering av order', error);
		throw error;
	}
};
