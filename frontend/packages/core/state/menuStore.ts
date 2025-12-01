import { create } from "zustand";
import { fetchMenuData } from "@nattugglan/menupage/data/fetchMenu";

interface MenuItem {
  id: string;
  name: string;
  ingredients: string[];
  price: number;
  category: string;
  available: boolean;
}

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
