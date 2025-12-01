import { getAllMenuItems } from "./repository";


export async function listMenu() {
  return await getAllMenuItems();
}
