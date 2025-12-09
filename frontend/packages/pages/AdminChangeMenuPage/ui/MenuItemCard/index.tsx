import React, { useState } from 'react';
import { Button } from '@nattugglan/button'; 


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

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, categories, onSave }) => { 
	const [isEditing, setIsEditing] = useState(false);

	const [name, setName] = useState(item.name);
	const [price, setPrice] = useState(String(item.price)); 
	const [category, setCategory] = useState(item.category);
	const [ingredients, setIngredients] = useState(item.ingredients.join(', ')); 
	const [available, setAvailable] = useState(item.available);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		
		if (name === 'name') setName(value);
		else if (name === 'price') setPrice(value);
		else if (name === 'category') setCategory(value);
		else if (name === 'ingredients') setIngredients(value);
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAvailable(e.target.checked);
	};


	const handleSave = async () => {
		const dataToSave: Partial<MenuItem> = {};

		// 1. Namn
		if (name !== item.name) dataToSave.name = name;
		
		// 2. Pris
		if (price !== String(item.price)) dataToSave.price = Number(price); 

		// 3. Kategori
		if (category !== item.category) dataToSave.category = category;

		// 4. Tillgänglighet
		if (available !== item.available) dataToSave.available = available;

		// 5. Ingredienser
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
			<div className="menu__item-card">
				<h3>{item.name}</h3>
				<p><strong>Pris:</strong> {item.price}:-</p>
				<p><strong>Kategori:</strong> {item.category}</p>
				<p><strong>Ingredienser:</strong> {item.ingredients.join(', ')}</p>
				<p><strong>Tillgänglig:</strong> {item.available ? 'Ja' : 'Nej'}</p>
				
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

	// --- REDIGERINGSLÄGE ---
	return (
		<div className="menu__item-card menu__item-card--editing">
			<h3>{item.name} (Redigera)</h3>
				
			<label>Namn:</label>
			<input 
				type="text" 
				name="name" 
				value={name} 
				onChange={handleTextChange}
			/>
			
			<label>Pris (kr):</label>
			<input 
				type="number" 
				name="price" 
				value={price} 
				onChange={handleTextChange}
			/>
			
			<label>Kategori:</label>
			<select 
				name="category" 
				value={category} 
				onChange={handleTextChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
			>
				{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
			</select>
				
			<label>Ingredienser:</label>
			<textarea 
				name="ingredients" 
				value={ingredients} 
				onChange={handleTextChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
			/>

			<label className="checkbox__label">
				Tillgänglig:
				<input 
					type="checkbox" 
					name="available" 
					checked={available} 
					onChange={handleCheckboxChange} 
				/>
			</label>

			<div className="card__actions">
				<Button 
					fullWidth={false}
					variant="secondary"
					onClick={() => {
						setName(item.name);
						setPrice(String(item.price));
						setCategory(item.category);
						setIngredients(item.ingredients.join(', '));
						setAvailable(item.available);
						setIsEditing(false);
					}}
				>
					Avbryt
				</Button>
				<Button 
					fullWidth={false} 
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