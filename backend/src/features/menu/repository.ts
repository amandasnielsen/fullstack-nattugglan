import { MenuItemModel } from "../../core/database/models/menuItem.model";

export async function getAllMenuItems() {
  return MenuItemModel.find();
}
