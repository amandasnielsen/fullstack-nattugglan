import { placeOrder } from './service';
import { validateNewOrder } from './validation';
import { OrderInterface } from '../../core/database/models/order.model';
import { decreaseStock } from '../ingredients/service';

export const handleNewOrder = async (body: any): Promise<OrderInterface> => {
  const validateData = validateNewOrder(body);
  const newOrder = await placeOrder(validateData);

  try {
    const allIngredientNames: string[] = [];

    newOrder.items.forEach(item => {
      const quantity = item.quantity || 1; 
      
      for (let i = 0; i < quantity; i++) {
        allIngredientNames.push(...item.ingredients);
      }
    });

    if (allIngredientNames.length > 0) {
      await decreaseStock(allIngredientNames);
    }
  } catch (error) {
    console.error("Lagret kunde inte uppdateras:", error);
  }

  return newOrder;
};