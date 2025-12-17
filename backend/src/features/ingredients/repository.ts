import { IngredientModel } from '../../core/database/models/ingredient.model';

export const decreaseIngredients = async (ingredientNames: string[]) => {
  for (const name of ingredientNames) {
    await IngredientModel.findOneAndUpdate(
      { name },
      { $inc: { quantity: -1 } }
    );
  }
};
