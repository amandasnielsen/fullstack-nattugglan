import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { Button } from '@nattugglan/button';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

// Hämta State-hantering
import { useMenuStore } from '../../../core/state/menuStore';
import { useCartStore } from '../../../core/state/cartStore'; 

import QuantityControl from '../../../base/QuantityControl/ui'; 


function MenuPage() {
  
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const menu = useMenuStore((state) => state.menu);
  const fetchMenu = useMenuStore((state) => state.fetchMenu);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <>
      <NavBar />
      
      <h1>Fuel the night!</h1> 
      
      <ContentContainer>
        <div className="menu-list">
          
          {!menu || menu.length === 0 ? (
            <p className="loading__message">Laddar menyn eller menyn är tom...</p>
          ) : (
            menu.map((item) => {
              
              const description = item.ingredients.join(', ');

              return (
                <div key={item._id} className="menu-item-card">
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{description}</p>
                  </div>
                  
                  <div className="item-price-and-control">
                    <span className="item-price">{item.price}:-</span>
                    
                    <QuantityControl item={item} /> 
                  </div>
                </div>
              );
            })
          )}
          
        </div>
      </ContentContainer>
      
      <div className="button__checkout-wrapper">
        <Button
          fullWidth={false}
          onClick={handleCheckout}
          disabled={totalQuantity === 0}
          className="button__checkout"
          variant='secondary'
        >
          {/* Endast priset visas nu */}
          Beställ - {totalPrice} kr
        </Button>
      </div>

      <Footer />
    </>
  );
}

export { MenuPage };