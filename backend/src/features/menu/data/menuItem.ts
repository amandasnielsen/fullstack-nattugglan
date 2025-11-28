export interface MenuItem {
    id: string;
    name: string;
    ingredients: string;
    price: number;
    category?: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
  }