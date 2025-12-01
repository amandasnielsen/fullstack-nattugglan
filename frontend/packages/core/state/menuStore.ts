import { create } from "zustand";
import { fetchMenuData } from "@nattugglan/menupage/data/fetchMenu";
import type { MenuItem } from '../types/types';

interface MenuState {
  menu: MenuItem[];
  fetchMenu: () => Promise<void>;
}

export const useMenuStore = create<MenuState>((set) => ({
  menu: [],
  fetchMenu: async () => {
    const data = await fetchMenuData();
    set({ menu: data });
  },
}));
