import { Request, Response } from 'express';
import { IngredientModel } from '../../core/database/models/ingredient.model'; 

export const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await IngredientModel.find({}).select('name unit stock');
    
    const ingredientNames = ingredients.map(ing => ing.name); 

    res.json(ingredientNames); 

  } catch (error) {
    console.error("Fel vid hämtning av alla ingredienser:", error);
    res.status(500).json({ message: "Kunde inte hämta ingredienslista." });
  }
};

export const getIngredientStock = async (req: Request, res: Response) => {
  try {
    const ingredients = await IngredientModel.find({}).select('name stock');
    res.json(ingredients); 
  } catch (error) {
    console.error("Fel vid hämtning av lagerstatus:", error);
    res.status(500).json({ message: "Kunde inte hämta lagerstatus." });
  }
};