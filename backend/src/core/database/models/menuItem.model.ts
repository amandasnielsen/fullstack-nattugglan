import { Schema, model } from "mongoose";

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  price: { type: Number, required: true },
  category: { type: String },
  available: { type: Boolean, default: true }
}, { timestamps: true });


export const MenuItemModel = model(
  "MenuItem",
  MenuItemSchema,
  "menu" 
);