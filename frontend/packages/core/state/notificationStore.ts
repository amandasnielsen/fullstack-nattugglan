import { create } from "zustand";

interface NotificationStore {
  updatedOrderNumbers: string[]; 
  notificationCount: number; 

  addNotification: (orderNumber: string) => void;
  clearNotification: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  updatedOrderNumbers: [],
  notificationCount: 0, 

  addNotification: (orderNumber) => {
    const state = get();
    
    if (!state.updatedOrderNumbers.includes(orderNumber)) {
			set((s) => ({
				updatedOrderNumbers: [...s.updatedOrderNumbers, orderNumber],
				notificationCount: s.notificationCount + 1,
			}));
    }
  },

  clearNotification: () => set({ 
		notificationCount: 0, 
		updatedOrderNumbers: [] 
  }),
}));