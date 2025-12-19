import { Request, Response, RequestHandler } from "express";
import { fetchAllMenuItems, updateMenuItem, MenuUpdateInput } from "./service";

interface ItemParams {
  itemId: string;
}

export async function getMenu(req: Request, res: Response) {
  try {
    const items = await fetchAllMenuItems(); 
    res.json(items);
  } catch (error: any) {
    console.error('Fel vid GET /menu:', error); 
    res.status(500).json({ message: 'Kunde inte hämta menyn' });
  }
}

const updateItemFunction = async (
  req: Request<ItemParams, {}, MenuUpdateInput>,
  res: Response
) => {
  try {
    const { itemId } = req.params;
    const updateData: MenuUpdateInput = req.body; 

    const updatedItem = await updateMenuItem(itemId, updateData);

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menyvara hittades ej' });
    }

    res.status(200).json(updatedItem); 
  } catch (error: any) {
    console.error(`Fel vid PUT /admin/menu/${req.params.itemId}:`, error);
    res.status(400).json({ 
      message: 'Kunde inte uppdatera menyvaran', 
      error: error.message || 'UPDATE_FAILED' 
    });
  }
};

// FIX: Exportera den konverterade funktionen med DUBBEL KONVERTERING
export const updateItem = updateItemFunction as unknown as RequestHandler;