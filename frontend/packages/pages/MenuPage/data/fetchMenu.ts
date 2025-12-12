const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchMenuData() {
	const res = await fetch(`${BASE_URL}/api/menu`);
	return res.json();
}
