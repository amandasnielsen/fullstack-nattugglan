import { apiFetch } from '@nattugglan/core/apiClient/apiClient';
import { useAuthStore } from "@nattugglan/core";

export interface IngredientStock {
  _id: string;
  name: string;
  stock: number;
}

export async function fetchIngredientStock(): Promise<IngredientStock[]> {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error("Missing admin token");
  }

  return apiFetch('/admin/stock', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}