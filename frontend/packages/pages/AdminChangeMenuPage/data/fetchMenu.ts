import type { MenuItem } from '../ui/index';
import { apiFetch } from '@nattugglan/core/apiClient/apiClient';

export async function fetchMenuItems(
	token: string | null,
	logout: () => void,
	navigate: (path: string) => void
): Promise<MenuItem[]> {
	if (!token) {
		navigate('/login');
		throw new Error('No authentication token provided.');
	}

	try {
		const data = await apiFetch('/menu', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return data;
	} catch (error: any) {
		console.error('Fel vid hämtning av menyn:', error);

		if (error.status === 401 || error.status === 403) {
			logout();
			navigate('/access-denied');
		}
		throw error;
	}
}
