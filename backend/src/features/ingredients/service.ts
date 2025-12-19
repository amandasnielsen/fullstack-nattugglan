import { IngredientModel } from '../../core/database/models/ingredient.model';

// kopplar ihop att beställningarna gör att lagerstatus per ingrediens justeras
// ser även till att antalet ingredienser i samma beställning blir korrekt
export const decreaseStock = async (ingredientNames: string[]) => {
  const counts: Record<string, number> = {};
  
  ingredientNames.forEach(name => {
    const n = name.toLowerCase();
    counts[n] = (counts[n] || 0) - 1;
  });
	
  const updatePromises = Object.entries(counts).map(([name, amount]) => 
    IngredientModel.updateOne(
      { name: name },
      { $inc: { stock: amount } } // här skickas t.ex. -4
    )
  );

  await Promise.all(updatePromises);
};