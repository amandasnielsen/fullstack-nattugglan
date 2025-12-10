import { create } from "zustand";

interface NotificationStore {
  hasNewOrderUpdate: boolean;
  setNewOrderUpdate: (value: boolean) => void;
  clearNotification: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasNewOrderUpdate: false,
  setNewOrderUpdate: (value) => set({ hasNewOrderUpdate: value }),
  clearNotification: () => set({ hasNewOrderUpdate: false }),
}));
