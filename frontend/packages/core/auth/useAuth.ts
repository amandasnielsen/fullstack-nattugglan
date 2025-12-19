import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core';
import { apiFetch } from '../apiClient/apiClient';

export const useAuth = () => {
	const navigate = useNavigate();
	const logoutAction = useAuthStore((state) => state.logout);

	const logout = async () => {
		try {
			const response = await apiFetch(`/auth/logout`, {
				method: 'POST',
			});

			if (response.ok) {
				console.log('Logout detected.');
			}
		} catch (error) {
			console.error('Logout failed, proceeding with local cleanup.', error);
		} finally {
			logoutAction();
			navigate('/menu');
		}
	};

	return { logout };
};
