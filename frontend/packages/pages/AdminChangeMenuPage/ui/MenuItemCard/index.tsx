import React, { useState, useEffect } from 'react';
import { Button } from '@nattugglan/button'; 
import { useAuthStore } from '@nattugglan/core';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  ingredients: string[];
  available: boolean;
}

interface MenuItemCardProps {
  item: MenuItem;
  categories: string[]; 
  onSave: (itemId: string, updateData: Partial<MenuItem>) => Promise<void>;
}

const IngredientsDropDown = ({ onSelect, currentIngredients }: { onSelect: (name: string) => void, currentIngredients: string[] }) => {
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    const fetchIng = async () => {
      try {
				// ÄNDRA TILL BASE_URL
        const res = await fetch("http://localhost:3000/api/admin/ingredients", {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const names = await res.json();
          setAllIngredients(names);
        }
      } catch (e) { console.error("Kunde inte hämta ingredienslista", e); }
    };
    fetchIng();
  }, [token]);

  return (
    <div className="ingredients__dropdown-wrapper">
      <select 
        className="ingredient__select"
        defaultValue="" 
        onChange={(e) => {
          onSelect(e.target.value);
          e.target.value = ""; 
        }}
      >
        <option value="" disabled>+ Lägg till ingrediens</option>
        {allIngredients
          .filter(name => !currentIngredients.includes(name))
          .map(name => <option key={name} value={name}>{name}</option>)
        }
      </select>
    </div>
  );
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSave, categories }) => { 
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(String(item.price)); 
  const [category, setCategory] = useState(item.category); 
  const [ingredients, setIngredients] = useState<string[]>(item.ingredients); 

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'price') setPrice(value);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value); 
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddIngredient = (newIngName: string) => {
    if (!ingredients.includes(newIngName)) {
      setIngredients(prev => [...prev, newIngName]);
    }
  };

  const handleSave = async () => {
    const dataToSave: Partial<MenuItem> = {};

    if (name !== item.name) dataToSave.name = name;
    if (price !== String(item.price)) dataToSave.price = Number(price); 
    if (category !== item.category) dataToSave.category = category; 
    
    const normalizedNew = ingredients.slice().sort().join('|');
    const normalizedOriginal = item.ingredients.slice().sort().join('|');

    if (normalizedNew !== normalizedOriginal) {
      dataToSave.ingredients = ingredients; 
    }

    if (Object.keys(dataToSave).length > 0) {
      await onSave(item._id, dataToSave);
    }
    
    setIsEditing(false);
  };

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
      <input type="text" name="name" value={name} onChange={handleTextChange} />
      
      <label><strong>Pris (kr):</strong></label>
      <input type="number" name="price" value={price} onChange={handleTextChange} />
      
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
      <div className="ingredients__edit-list">
        {ingredients.map((ing, index) => (
          <div key={index} className="ingredient__input-row">
            <input type="text" value={ing} readOnly />
            <Button 
              fullWidth={false}
              variant="primary"
              onClick={() => handleRemoveIngredient(index)}
              className='ingredients__delete-button'
            >
              Ta bort
            </Button>
          </div>
        ))}
        {/* Renderar den lokala dropdownen */}
        <IngredientsDropDown onSelect={handleAddIngredient} currentIngredients={ingredients} />
      </div>

      <div className="card__actions-menu">
        <Button 
          fullWidth={false}
          className="cancel__button"
          variant="secondary"
          onClick={() => {
            setName(item.name);
            setPrice(String(item.price));
            setCategory(item.category);
            setIngredients(item.ingredients);
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