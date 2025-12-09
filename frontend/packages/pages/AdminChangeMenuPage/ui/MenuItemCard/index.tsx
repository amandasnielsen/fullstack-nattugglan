import React, { useState } from 'react';
import { Button } from '@nattugglan/button'; 

// --- TYPER ---

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  ingredients: string[];
  available: boolean; // Behålls i typen men ignoreras i UI
}

interface MenuItemCardProps {
  item: MenuItem;
  categories: string[]; 
  onSave: (itemId: string, updateData: Partial<MenuItem>) => Promise<void>;
}

// --- DEN REDIGERBARA KOMPONENTEN ---

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSave, categories }) => { 
  const [isEditing, setIsEditing] = useState(false);

  // Initiera state för de fält som SKA redigeras
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(String(item.price)); 
  const [category, setCategory] = useState(item.category); 
  const [ingredients, setIngredients] = useState(item.ingredients.join(', ')); 
  // BORTTAGEN STATE: available


  // Funktion för textinput, numberinput, och textarea
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name') setName(value);
    else if (name === 'price') setPrice(value);
    else if (name === 'ingredients') setIngredients(value);
    // OBS: Category hanteras nu enbart av handleCategoryChange
  };
  
  // Hanterare för Radio Buttons (Kategori)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value); 
  };


  const handleSave = async () => {
    const dataToSave: Partial<MenuItem> = {};

    // 1. Namn
    if (name !== item.name) dataToSave.name = name;
    
    // 2. Pris
    if (price !== String(item.price)) dataToSave.price = Number(price); 

    // 3. Kategori
    if (category !== item.category) dataToSave.category = category; 

    // BORTTAGEN LOGIK: Tillgänglighet skickas inte.
    /* if (available !== item.available) dataToSave.available = available; 
    */

    // 4. Ingredienser
    const newIngredientsArray = ingredients 
      ? ingredients.split(',').map(s => s.trim()).filter(s => s.length > 0) 
      : [];
        
    if (JSON.stringify(newIngredientsArray) !== JSON.stringify(item.ingredients)) {
      dataToSave.ingredients = newIngredientsArray; 
    }

    if (Object.keys(dataToSave).length > 0) {
      await onSave(item._id, dataToSave);
    }
    
    setIsEditing(false);
  };

  // --- VISNINGSLÄGE ---
  if (!isEditing) {
    return (
      <div className="admin__menu-card">
        <h3>{item.name}</h3>
        <p><strong>Pris:</strong> {item.price}:-</p> 
        
        <p><strong>Kategori:</strong> {item.category}</p> 
        
        <div className="ingredients__container">
          <p><strong>Ingredienser:</strong> {item.ingredients.join(', ')}</p> 
        </div>

  		  <Button 
          fullWidth={false} 
          variant="secondary"
          onClick={() => setIsEditing(true)}
          className="edit__button"
        >
          Ändra
        </Button>
      </div>
    );
  }

  return (
    <div className="admin__menu-card admin__menu-card--editing">
      <h3>{item.name} (Redigera)</h3>
        
      <label><strong>Namn:</strong></label>
      <input 
        type="text" 
        name="name" 
        value={name} 
        onChange={handleTextChange}
      />
      
      <label><strong>Pris (kr):</strong></label>
      <input 
        type="number" 
        name="price" 
        value={price} 
        onChange={handleTextChange}
      />
      
      <div className="category__radio-group">
        <label><strong>Kategori:</strong></label>
        <div className="category__options">
          {categories.map(cat => (
            <label key={cat} className="category__option">
              <input 
                type="radio" 
                name="category" 
                value={cat} 
                checked={category === cat}
                onChange={handleCategoryChange} 
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
        
      <label><strong>Ingredienser:</strong></label>
      <textarea 
        name="ingredients" 
        value={ingredients} 
        onChange={handleTextChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
      />

      <div className="card__actions-menu">
        <Button 
          fullWidth={false}
          className="cancel__button"
          variant="secondary"
          onClick={() => {
            setName(item.name);
            setPrice(String(item.price));
            setCategory(item.category);
            setIngredients(item.ingredients.join(', '));
            setIsEditing(false);
          }}
        >
          Avbryt
        </Button>
        <Button 
          fullWidth={false}
          className="save__button"
          variant="primary"
          onClick={handleSave}
        >
          Spara
        </Button>
      </div>
    </div>
  );
};

export { MenuItemCard };