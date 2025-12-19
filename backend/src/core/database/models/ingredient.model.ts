import { Schema, model } from "mongoose";

export interface Ingredient {
  name: string;
  stock: number;
}

const IngredientSchema = new Schema<Ingredient>(
  {
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const IngredientModel = model<Ingredient>(
  "Ingredient",
  IngredientSchema,
  "ingredients"
);
