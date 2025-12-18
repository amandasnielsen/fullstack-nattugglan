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

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/admin/stock`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}

