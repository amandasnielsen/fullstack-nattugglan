import { create } from "zustand";

interface AuthState {
  token: string | null;
  role: 'admin' | 'user' | null; 
  login: (token: string, role: 'admin' | 'user') => void;
  logout: () => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null, 

  setToken: (token) => set({ token }), 
  login: (token, role) => {
    set({ token, role });
  },

  logout: () => {
    set({ token: null, role: null });
  },
}));