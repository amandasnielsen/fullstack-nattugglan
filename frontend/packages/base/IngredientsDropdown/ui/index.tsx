import { useState, useEffect } from 'react';
import { useAuthStore } from '@nattugglan/core';

//const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = "http://localhost:3000";

interface Ingredient {
  _id: string;
  name: string;
}

interface Props {
  onSelect: (ingredientName: string) => void;
  excludeNames: string[];
}

export const IngredientsDropDown = ({ onSelect, excludeNames }: Props) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/admin/ingredients`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setIngredients(data.filter((ing: Ingredient) => !excludeNames.includes(ing.name)));
      } catch (error) {
        console.error("Kunde inte hämta ingredienser:", error);
      }
    };
    fetchIngredients();
  }, [token, excludeNames, BASE_URL]);

  return (
    <div className="ingredients__dropdown-wrapper">
      <select 
        defaultValue="" 
        onChange={(e) => {
          if (e.target.value) onSelect(e.target.value);
          e.target.value = "";
        }}
      >
        <option value="" disabled>+ Lägg till ingrediens</option>
        {ingredients.map((ing) => (
          <option key={ing._id} value={ing.name}>
            {ing.name}
          </option>
        ))}
      </select>
    </div>
  );
};