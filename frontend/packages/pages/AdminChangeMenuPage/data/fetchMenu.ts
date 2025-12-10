import type { MenuItem } from '../ui/index';

const API_BASE_URL = 'http://localhost:3000/api'; 
const MENU_ENDPOINT = `${API_BASE_URL}/menu`;

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
		const response = await fetch(MENU_ENDPOINT, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`, 
				'Content-Type': 'application/json',
			},
		});

		if (response.status === 401 || response.status === 403) {
			logout(); 
			navigate('/access-denied');
			throw new Error('Authentication failed or access denied.'); 
		}
		
		if (!response.ok) {
			throw new Error(`Failed to fetch menu: ${response.statusText}`);
		}

		const data: MenuItem[] = await response.json();
		return data;

	} catch (error) {
		console.error("Fel vid hämtning av menyn:", error);
		throw error;
	}
}