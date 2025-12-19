import "./index.css";
import { useEffect, useState } from "react";
import { NavBarAdmin } from "@nattugglan/navbaradmin";
import { FooterAdmin } from "@nattugglan/footeradmin";
import { ContentContainer } from "@nattugglan/contentcontainer";
import { fetchIngredientStock } from "../data/fetchStock";
import type { IngredientStock } from "../data/fetchStock";

export function StockPage() {
  const [ingredients, setIngredients] = useState<IngredientStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIngredientStock()
      .then((data) => {
        const sorted = [...data].sort((a, b) => 
          a.name.localeCompare(b.name, 'sv')
        );
        setIngredients(sorted);
      })
      .catch((err) => {
        console.error(err);
        setError("Kunde inte hämta lagerstatus");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin__stock-page">
      <NavBarAdmin />
      
			<h1>Lagerstatus</h1>

      <ContentContainer>

        {loading && <p className="loading__message">Laddar lager...</p>}
        {error && <p className="error__message">{error}</p>}

        {!loading && !error && (
          <div className="stock__table-wrapper">
            <table className="stock__table">
              <thead>
                <tr>
                  <th>Ingrediens</th>
                  <th className="stock__count-title">Antal</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ing) => (
                  <tr key={ing._id} className="stock__row">
                    <td className="stock__name">{ing.name}</td>
                    <td className={`stock__count ${ing.stock < 30 ? 'stock--low' : ''}`}>
                      {ing.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ContentContainer>

      <FooterAdmin />
    </div>
  );
}