import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useState, useEffect, useMemo } from 'react';
import { useAuthStore } from '@nattugglan/core';
import { useNavigate } from 'react-router-dom';
import { MenuItemCard } from './MenuItemCard';

interface MenuItem {
    _id: string;
    name: string;
    price: number;
    category: string;
    ingredients: string[];
    available: boolean;
}

// Grupperar menyvaror efter kategori
interface GroupedItems {
    [category: string]: MenuItem[];
}

// Kategorier (matcha dina data)
const CATEGORIES = ['Kött', 'Vego', 'Snacks', 'Dricka'];
const API_BASE_URL = 'http://localhost:3000/api'; 

// --- HUVUDKOMPONENT ---

function AdminChangeMenuPage() {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);

	const token = useAuthStore(state => state.token);
	const logout = useAuthStore(state => state.logout);
	const navigate = useNavigate();

	// 1. Hämta menydata vid sidladdning
	useEffect(() => {
			const fetchMenuItems = async () => {
					if (!token) {
							navigate('/login');
							return;
					}

					try {
							// Använder GET /menu (icke-adminskyddad rutt för gäster/admin-visning)
							const response = await fetch(`${API_BASE_URL}/menu`, {
									method: 'GET',
									headers: {
											// Inkludera token för att få tillgång till adminsidan, 
											// även om GET /menu är publik behöver denna adminsida ändå autentisering
											'Authorization': `Bearer ${token}`, 
											'Content-Type': 'application/json',
									},
							});

							if (response.status === 401 || response.status === 403) {
									logout(); 
									navigate('/access-denied');
									return;
							}
							
							if (!response.ok) {
									throw new Error(`Failed to fetch menu: ${response.statusText}`);
							}

							const data: MenuItem[] = await response.json();
							setMenuItems(data);

					} catch (error) {
							console.error("Fel vid hämtning av menyn:", error);
					} finally {
							setLoading(false);
					}
			};

			fetchMenuItems();
	}, [token, navigate, logout]);


	// 2. Gruppera menyvarorna per kategori (Används för rendering)
	const groupedItems = useMemo(() => {
			return menuItems.reduce<GroupedItems>((acc, item) => {
					const category = item.category || 'Övrigt';
					if (!acc[category]) {
							acc[category] = [];
					}
					acc[category].push(item);
					return acc;
			}, {});
	}, [menuItems]);


	// 3. Funktion för att skicka PUT/PATCH till backend
	const handleUpdate = async (itemId: string, updateData: Partial<MenuItem>) => {
			if (!token) return;

			try {
					const response = await fetch(`${API_BASE_URL}/admin/menu/${itemId}`, { 
							method: 'PUT', 
							headers: { 
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${token}`,
							},
							body: JSON.stringify(updateData),
					});

					if (response.status === 401 || response.status === 403) {
							logout(); 
							navigate('/access-denied');
							return;
					}

					if (!response.ok) {
							throw new Error('Kunde inte uppdatera menyn.');
					}
					
					// Uppdatera det lokala statet med den returnerade uppdaterade varan
					const updatedItem = await response.json() as MenuItem;
					
					setMenuItems(prev => prev.map(item => 
							// Ersätt den gamla varan med den nya (inklusive t.ex. uppdaterade timestamps)
							item._id === itemId ? updatedItem : item
					));

					console.log(`Menyvara ${updatedItem.name} uppdaterad!`);

			} catch (error) {
					console.error("Uppdatering misslyckades:", error);
					alert("Kunde inte spara ändringarna. Se konsolen för detaljer.");
			}
	};


	if (loading) {
			return (
					<>
							<NavBarAdmin />
							<h1>Ändra menyn</h1>
							<ContentContainer><p>Laddar meny...</p></ContentContainer>
							<Footer />
					</>
			);
	}


	// 4. Huvudrendering av menyn
	return (
		<section className="admin__menu-page">
			<NavBarAdmin />
			<h1>Ändra menyn</h1>
			<ContentContainer>
				<div className="menu__container">
					{CATEGORIES.map(categoryName => (
						<div key={categoryName} className="menu__category-group">
							{groupedItems[categoryName] && groupedItems[categoryName].length > 0 && (
								<h2>{categoryName}</h2>
							)}
							{groupedItems[categoryName]?.map(item => (
								<MenuItemCard 
										key={item._id} 
										item={item} 
										categories={CATEGORIES}
										onSave={handleUpdate} 
								/>
							))}
						</div>
					))}
				</div>
			</ContentContainer>
			<Footer />
		</section>
	);
}

export { AdminChangeMenuPage };