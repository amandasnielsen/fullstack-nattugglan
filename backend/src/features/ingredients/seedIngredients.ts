import mongoose from "mongoose";
import dotenv from "dotenv";
import { ingredientsSeed } from "./data/ingredientsSeed";
import { IngredientModel } from "../../core/database/models/ingredient.model";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);

  for (const ing of ingredientsSeed) {
    await IngredientModel.updateOne(
      { name: ing.name },
      { $setOnInsert: ing },
      { upsert: true }
    );
  }

  console.log("Ingredients seeded");
  process.exit(0);
}

seed();
