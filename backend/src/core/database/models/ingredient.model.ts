import { Schema, model } from "mongoose";

const IngredientSchema = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, default: "pcs" }
  },
  { timestamps: true }
);

export const IngredientModel = model("Ingredient", IngredientSchema);