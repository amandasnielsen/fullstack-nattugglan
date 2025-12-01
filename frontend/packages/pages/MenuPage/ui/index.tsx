import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { Button } from '@nattugglan/button';
import { ContentContainer } from '@nattugglan/contentcontainer';

import { useCartStore } from '../../../core/cartStore'; 
import QuantityControl from '../../../base/QuantityControl/ui'; 
import { dummyMenu } from '../dummyMenu'; 

function MenuPage() {
  
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handleCheckout = () => {
    console.log('Gå till kassan.', totalPrice);
  };

  return (
    <>
      <NavBar />
      
      <h1 className="menu-header">Fuel the night!</h1> 
      
      <ContentContainer>
        <div className="menu-list">
          {dummyMenu.map((item) => {

            return (
              <div key={item.id} className="menu-item-card">
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                </div>
                
                <div className="item-price-and-control">
                  <span className="item-price">{item.price}:-</span>
                  
                  <QuantityControl item={item} /> 
              
                </div>
              </div>
            );
          })}
        </div>
      </ContentContainer>
      
      <div className="button__checkout-wrapper">
        <Button
          fullWidth={true}
          onClick={handleCheckout}
          disabled={totalQuantity === 0}
          className="button__checkout"
					variant='secondary'
        >
          Beställ - {totalPrice} kr
        </Button>
      </div>

      <Footer />
    </>
  );
}

export { MenuPage };