import './index.css';
import Leaf from '../assets/leaf.png';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { Button } from '@nattugglan/button';
import { QuantityControl } from '@nattugglan/quantitycontrol';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useMenuStore, useCartStore, type MenuItem } from '@nattugglan/core'; // Importerar MenuItem för typning
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

const CATEGORIES = [
  'Visa allt',
  'Kött',
  'Vego',
  'Snacks',
  'Dricka'
]

// Hjälptyp för att gruppera menyn
type GroupedMenu = Record<string, MenuItem[]>;


function MenuPage() {

  const [activeCategory, setActiveCategory] = useState<string>('Visa allt');

  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const menu = useMenuStore((state) => state.menu);
  const fetchMenu = useMenuStore((state) => state.fetchMenu);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleCheckout = () => {
    navigate('/cart');
  };

  // NY LOGIK: Grupperar menyn baserat på vald kategori
  const menuToDisplay = useMemo(() => {
    // Filtrera alla objekt baserat på vald kategori
    const filtered = (activeCategory === 'Visa allt')
      ? menu
      : menu.filter(item => item.category.toUpperCase() === activeCategory.toUpperCase());
    
    // Gruppera de filtrerade objekten
    const grouped: GroupedMenu = filtered.reduce((acc, item) => {
      const categoryKey = item.category || 'Övrigt'; // Använd kategorin som nyckel
      
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(item as MenuItem);
      return acc;
    }, {} as GroupedMenu);

    return grouped;

  }, [menu, activeCategory]);


  return (
    <section className="menu__page">
      <NavBar />

      <h1>Fuel the night!</h1>

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
        <div className="menu__list">
          {!menu || menu.length === 0 ? (
            <p className="loading__message">Laddar menyn...</p>
          ) : (
            
            // LOOPA ÖVER KATEGORIERNA (Nycklar i 'menuToDisplay')
            Object.keys(menuToDisplay).map(categoryKey => (
              <div key={categoryKey} className="menu__category-section">
                
                {/* 1. KATEGORIRUBRIK */}
                <h2 className="category__title">{categoryKey}</h2>

                {/* 2. LOOPA ÖVER ARTIKLARNA INOM DENNA KATEGORI */}
                {menuToDisplay[categoryKey].map((item, index, array) => {
                  const description = item.ingredients.join(', ');

                  // Bestäm om detta är det sista kortet i KATEGORIN (för att ta bort border)
                  const isLastItem = index === array.length - 1;

                  return (
                    // VIKTIGT: Lägg till villkorlig klass för att hantera sista border
                    <div key={item._id} 
                         className={`menu__item-card ${isLastItem ? 'menu__item-card--last-in-section' : ''}`}
                    >
                      <div className="item__details">
                        <h3 className="item__name">{item.name}
                          {item.category.toUpperCase() === 'VEGO' && (
                            <img 
                              src={Leaf} 
                              alt="Vegansk ikon" 
                              className="item__vego-icon"
                            />
                          )}
                        </h3>
                        <p className="item__description">{description}</p>
                      </div>

                      <div className="item__price-control">
                        <span className="item__price">{item.price}:-</span>
                        <QuantityControl item={item} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </ContentContainer>

      <div className="button__checkout-wrapper">
        <Button
          fullWidth={false}
          onClick={handleCheckout}
          disabled={totalQuantity === 0}
          className="button__checkout"
          variant="secondary"
        >
          Beställ - {totalPrice} kr
        </Button>
      </div>

      <Footer />
    </section>
  );
}

export { MenuPage };