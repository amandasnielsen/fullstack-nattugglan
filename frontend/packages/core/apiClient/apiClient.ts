const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export class CustomError extends Error {
	status?: number

	constructor(status?: number) {
		super()

		this.status = status
	}
}

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
	
	const url = `${API_BASE_URL}/api${endpoint}`;
	const defaultHeaders = {
		'Content-Type': 'application/json',
		'x-api-key': API_KEY,
	};

	const config = {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
	};

	const response = await fetch(url, config);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		const customError = new CustomError(errorData.message || `Fel vid anropet: ${response.status}`);

		customError.status = response.status

		throw customError
	}

	const data = await response.json();
	return data;
};
