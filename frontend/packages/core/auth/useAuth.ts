import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuth = () => {
  const navigate = useNavigate();
  const logoutAction = useAuthStore(state => state.logout); 

  const logout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
      });

      if (response.ok) {
        console.log("Logout detected.");
      }

    } catch (error) {
      console.error("Logout failed, proceeding with local cleanup.", error);
    } finally {
      logoutAction(); 
      navigate('/menu');
    }
  };

  return { logout };
};