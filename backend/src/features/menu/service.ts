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
  
  const processedData: ProcessedMenuUpdate = { ...updateData } as any; 

  if (processedData.ingredients && typeof processedData.ingredients === 'string') {
    
    const ingredientsString: string = processedData.ingredients;

    const ingredientsArray = ingredientsString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    processedData.ingredients = ingredientsArray;
  }
  
  return await updateMenuItemRepo(itemId, processedData as Partial<MenuItemInterface>);
};

export const fetchAllMenuItems = async (): Promise<MenuItemInterface[]> => {
  return await getAllMenuItems();
};