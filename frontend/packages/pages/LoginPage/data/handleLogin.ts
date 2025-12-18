import { apiFetch } from '@nattugglan/core/apiClient/apiClient';

export interface LoginResponse {
	token: string;
	role: 'admin' | 'user';
}

export async function loginRequest(username: string, password: string): Promise<LoginResponse> {
  const data = await apiFetch(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  return data as LoginResponse;
}