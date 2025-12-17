import { apiFetch } from '@nattugglan/core/apiClient/apiClient';

export async function fetchMenuData() {
	const res = await apiFetch('/menu');
	return res;
}
