import { IngredientModel } from '../../core/database/models/ingredient.model';

// kopplar ihop att beställningarna gör att lagerstatus per ingrediens justeras
export const decreaseStock = async (ingredientNames: string[]) => {
  
  const updatePromises = ingredientNames.map(name => 
    IngredientModel.updateOne(
      { name: name.toLowerCase() },
      { $inc: { stock: -1 } }
    )
  );

  await Promise.all(updatePromises);
};