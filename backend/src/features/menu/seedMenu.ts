import { connectDatabase } from "../../core/database";
import { MenuItemModel } from "../../core/database/models/menuItem.model";
import { menuSeed } from "./data/menuSeed";

async function seedMenu() {
  await connectDatabase();

  await MenuItemModel.deleteMany({});
  await MenuItemModel.insertMany(menuSeed);

  console.log("Menu seeded successfully!");
  process.exit(0);
}

seedMenu();
