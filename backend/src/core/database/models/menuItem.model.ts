import { Schema, model, Document, Types } from "mongoose";

export interface MenuItemInterface extends Document {
  _id: Types.ObjectId; 
  name: string;
  ingredients: string[];
  price: number;
  category?: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date; 
}

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  price: { type: Number, required: true },
  category: { type: String },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export const MenuItemModel = model<MenuItemInterface>(
  "MenuItem",
  MenuItemSchema,
  "menu" 
);