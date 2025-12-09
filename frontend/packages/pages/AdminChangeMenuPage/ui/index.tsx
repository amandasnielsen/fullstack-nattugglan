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

interface GroupedItems {
	[category: string]: MenuItem[];
}

const CATEGORIES = ['Kött', 'Vego', 'Snacks', 'Dricka'];
const API_BASE_URL = 'http://localhost:3000/api'; 

function AdminChangeMenuPage() {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);

	const token = useAuthStore(state => state.token);
	const logout = useAuthStore(state => state.logout);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchMenuItems = async () => {
			if (!token) {
				navigate('/login');
				return;
			}

			try {
				const response = await fetch(`${API_BASE_URL}/menu`, {
					method: 'GET',
					headers: {
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

			const updatedItem = await response.json() as MenuItem;
			
			setMenuItems(prev => prev.map(item => 
				item._id === itemId ? updatedItem : item
			));

			console.log(`Menyvara ${updatedItem.name} uppdaterad!`);

		} catch (error) {
			console.error("Uppdatering misslyckades:", error);
		}
	};


	if (loading) {
		return (
			<>
				<NavBarAdmin />
				<h1>Uppdatera menyn</h1>
				<ContentContainer><p>Laddar meny...</p></ContentContainer>
				<Footer />
			</>
		);
	}


	return (
    <section className="admin__menu-page">
      <NavBarAdmin />
      <h1>Uppdatera menyn</h1>
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
                    onSave={handleUpdate} 
                    categories={CATEGORIES} 
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