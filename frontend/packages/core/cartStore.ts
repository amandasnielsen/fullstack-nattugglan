import { create } from 'zustand';

// Typ för ett menyobjekt
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

// Typ för en artikel i kundvagnen
export type CartItem = MenuItem & {
  quantity: number;
};

// Typ för storens tillstånd
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, newQuantity: number) => void;
}

// Beräkningsfunktioner
const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

// Skapa Zustands store
export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,

  // Lägg till en ny artikel eller öka antalet för en befintlig
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      let newItems: CartItem[];

      if (existingItem) {
        // Om artikeln finns, öka antalet
        newItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Om artikeln är ny, lägg till den med 1
        newItems = [...state.items, { ...item, quantity: 1 }];
      }

      // Uppdatera totaler
      return {
        items: newItems,
        ...calculateTotals(newItems),
      };
    });
  },

  // Ta bort en artikel helt, eller minska antalet till noll
  removeItem: (id) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === id);
      let newItems: CartItem[] = state.items;

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Minska antalet
          newItems = state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          );
        } else {
          // Ta bort helt om antalet är 1
          newItems = state.items.filter((i) => i.id !== id);
        }
      }

      // Uppdatera totalet
      return {
        items: newItems,
        ...calculateTotals(newItems),
      };
    });
  },

  // Uppdatera kvantitet direkt (används inte i +/- logiken, men bra att ha)
  updateItemQuantity: (id, newQuantity) => {
    set((state) => {
      let newItems: CartItem[];

      if (newQuantity <= 0) {
        // Ta bort artikeln om antalet är 0 eller mindre
        newItems = state.items.filter((i) => i.id !== id);
      } else {
        // Uppdatera antalet
        newItems = state.items.map((i) =>
          i.id === id ? { ...i, quantity: newQuantity } : i
        );
      }

      // Uppdatera totalet
      return {
        items: newItems,
        ...calculateTotals(newItems),
      };
    });
  },
}));