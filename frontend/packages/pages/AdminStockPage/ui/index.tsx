import "./index.css";
import { useEffect, useState } from "react";
import { NavBarAdmin } from "@nattugglan/navbaradmin";
import { FooterAdmin } from "@nattugglan/footeradmin";
import { ContentContainer } from "@nattugglan/contentcontainer";
import { useAuthStore } from "@nattugglan/core";
import { fetchIngredientStock } from "../data/fetchStock";
import type { IngredientStock } from "../data/fetchStock";




// export function StockPage() {
//   const token = useAuthStore((state) => state.token);
//   console.log('ADMIN TOKEN:', token);

//   const [ingredients, setIngredients] = useState<IngredientStock[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!token) return;

//     fetchIngredientStock(token)
//       .then(setIngredients)
//       .catch(() => setError("Kunde inte hämta lagerstatus"))
//       .finally(() => setLoading(false));
//   }, [token]);


export function StockPage() {
	const [ingredients, setIngredients] = useState<IngredientStock[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
	  fetchIngredientStock()
		.then(setIngredients)
		.catch((err) => {
		  console.error(err);
		  setError("Kunde inte hämta lagerstatus");
		})
		.finally(() => setLoading(false));
	}, []);


  return (
    <>
      <NavBarAdmin />
	  <FooterAdmin />
      <h1>Lagerstatus</h1>

      <ContentContainer>
        {loading && <p>Laddar lager...</p>}
        {error && <p>{error}</p>}

        {!loading &&
          !error &&
          ingredients.map((ing) => (
            <div key={ing._id} className="stock-item">
              <strong>{ing.name}</strong> – {ing.stock}
            </div>
          ))}
      </ContentContainer>

    </>
  );
}
