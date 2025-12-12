import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { FooterAdmin } from '@nattugglan/footeradmin';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useState, useEffect, useMemo } from 'react';
import { useAuthStore } from '@nattugglan/core';
import { useNavigate } from 'react-router-dom';
import { MenuItemCard } from './MenuItemCard';
import { Button } from '@nattugglan/button';
import { fetchMenuItems } from '../data/fetchMenu'; 

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface MenuItem {
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

const CATEGORIES = ['Visa allt', 'Kött', 'Vego', 'Snacks', 'Dricka'];
const API_BASE_URL = `${BASE_URL}/api`;

function AdminChangeMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Visa allt');

  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMenuItems = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const data = await fetchMenuItems(token, logout, navigate);
        setMenuItems(data);
      } catch (error) {
        console.error("Kunde inte ladda menydata:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, [token, navigate, logout]);

  const filteredMenuItems = useMemo(() => {
    return (activeCategory === 'Visa allt')
      ? menuItems
      : menuItems.filter(item =>
        item.category.toUpperCase() === activeCategory.toUpperCase()
      );
  }, [menuItems, activeCategory]);

  const groupedItems = useMemo(() => {
    return filteredMenuItems.reduce<GroupedItems>((acc, item) => {
      const category = item.category || 'Övrigt';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }, [filteredMenuItems]);

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
        <FooterAdmin />
      </>
    );
  }


  return (
    <section className="admin__menu-page">
      <NavBarAdmin />
      <h1>Uppdatera menyn</h1>
      <div className="filter__bar-wrapper">
        <div className="filter__bar">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              fullWidth={false}
              variant={activeCategory === category ? 'filterActive' : 'filter'}
              onClick={() => setActiveCategory(category)}
              className="filter__button"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <ContentContainer>
        <div className="menu__container">
          {CATEGORIES
            .filter(categoryName => 
              categoryName === 'Visa allt' || groupedItems[categoryName]?.length > 0
            )
            .map(categoryName => {
              
              if (categoryName === 'Visa allt') return null;
              
              const items = groupedItems[categoryName];

              return (
                <div key={categoryName} className="menu__category-group">
                  {items && items.length > 0 && (
                    <h2>{categoryName}</h2>
                  )}
          
                  {items?.map(item => (
                    <MenuItemCard 
                      key={item._id} 
                      item={item} 
                      onSave={handleUpdate} 
                      categories={CATEGORIES.filter(c => c !== 'Visa allt')}
                    />
                  ))}
                </div>
              );
            })
          }
          {activeCategory === 'Visa allt' && Object.keys(groupedItems).length === 0 && (
            <p>Inga produkter hittades</p>
          )}
        </div>
      </ContentContainer>
      <FooterAdmin />
    </section>
  );
}

export { AdminChangeMenuPage };