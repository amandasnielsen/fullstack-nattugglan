import './index.css';
import React from 'react';
import { useCartStore, type MenuItem } from '@nattugglan/core'; 

interface QuantityControlProps {
  item: MenuItem; 
}

const QuantityControl: React.FC<QuantityControlProps> = ({ item }) => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  
  const quantity = useCartStore(
    (state) => state.items.find((i) => i._id === item._id)?.quantity || 0 
  );

  const handleDecrease = () => {
    removeItem(item._id);
  };

  const handleIncrease = () => {
    addItem(item);
  };

  return (
    <div> 
        <div className="quantity__buttons-wrapper">
            <button onClick={handleDecrease} className="quantity__button" disabled={quantity === 0}>
                -
            </button>
            <span className="quantity__display">
                {quantity}
            </span>
            <button onClick={handleIncrease} className="quantity__button">
                +
            </button>
        </div>
    </div>
  );
};

export { QuantityControl };