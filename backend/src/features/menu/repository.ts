import { MenuItemModel, MenuItemInterface } from "../../core/database/models/menuItem.model";

export async function getAllMenuItems() {
  return MenuItemModel.find();
}

export async function updateMenuItemRepo(
  itemId: string,
  updateData: Partial<MenuItemInterface>
) {
  return MenuItemModel.findByIdAndUpdate(
    itemId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
}