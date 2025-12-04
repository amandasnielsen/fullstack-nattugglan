const fetchOrderDetails = async (orderNumber: string) => {
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
