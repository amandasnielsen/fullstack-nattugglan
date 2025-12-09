import { MenuItemInterface } from '../../core/database/models/menuItem.model';
import { updateMenuItemRepo, getAllMenuItems } from './repository';

export interface MenuUpdateInput {
  name?: string | undefined;
  price?: number | undefined;
  category?: string | undefined;
  ingredients?: string | undefined; 
  available?: boolean | undefined;
}

export type ProcessedMenuUpdate = {
	name?: string | undefined;
	price?: number | undefined;
	category?: string | undefined;
	ingredients?: string[] | undefined; 
	available?: boolean | undefined;
}

export const updateMenuItem = async (
  itemId: string, 
  updateData: MenuUpdateInput
): Promise<MenuItemInterface | null> => {
  
  const processedData: ProcessedMenuUpdate = {
    name: updateData.name,
    price: updateData.price,
    category: updateData.category,
    available: updateData.available,
  };

  if (updateData.ingredients && typeof updateData.ingredients === 'string') {
    processedData.ingredients = updateData.ingredients
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
	
  return await updateMenuItemRepo(itemId, processedData as Partial<MenuItemInterface>);
};

export const fetchAllMenuItems = async (): Promise<MenuItemInterface[]> => {
  return await getAllMenuItems();
};