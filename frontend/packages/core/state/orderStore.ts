import { create } from "zustand";

interface OrderState {
  orderNumber: string | null;
  setOrderNumber: (orderNumber: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orderNumber: null,
  setOrderNumber: (orderNumber) => set({ orderNumber }),
}));
