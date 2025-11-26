export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category?: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
  }