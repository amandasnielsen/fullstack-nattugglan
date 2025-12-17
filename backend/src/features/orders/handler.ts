import { placeOrder } from './service';
import { validateNewOrder } from './validation';
import { OrderInterface } from '../../core/database/models/order.model';
import { decreaseStock } from '../ingredients/service';

export const handleNewOrder = async (body: any): Promise<OrderInterface> => {
  const validateData = validateNewOrder(body);
  const newOrder = await placeOrder(validateData);

  try {
    const ingredientNames = newOrder.items.flatMap(item => item.ingredients);

    if (ingredientNames.length > 0) {
      await decreaseStock(ingredientNames);
    }
  } catch (error) {
    console.error("Lagret kunde inte uppdateras efter lagd order:", error);
  }
  return newOrder;
};