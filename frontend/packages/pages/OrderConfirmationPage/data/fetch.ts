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
};

export const fetchOrderDetails = async (orderNumber: string) => {
	try {
		const URL = `http://localhost:3000/api/order/${orderNumber}`;

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
			`http://localhost:3000/api/order/${orderNumber}`,
			{
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) throw new Error('Kunde inte uppdatera ordern');
		console.log(response);
		return response.json();
	} catch (error) {
		console.error('Fel vid uppdatering av order', error);
		throw error;
	}
};

export const putStatusChange = async (
	orderNumber: string,
	status: StatusChange
) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/orders/${orderNumber}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(status),
			}
		);

		if (!response.ok) throw new Error('Kunde inte uppdatera status på ordern');
		console.log(response);
		return response.json();
	} catch (error) {
		console.error('Fel vid uppdatering av order', error);
		throw error;
	}
};
