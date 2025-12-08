import React, { useState, useRef, useEffect } from 'react';
import './index.css';

type OrderStatus = 'Pending' | 'Confirmed' | 'Ready' | 'Done' | 'Cancelled';

interface StatusDropdownProps {
  currentStatus: OrderStatus;
  orderId: string;
  orderNumber: string;
	// körs när en ny status väljs. anropar backend och uppdaterar globalt state
  onStatusChange: (orderId: string, orderNumber: string, newStatus: OrderStatus) => void;
  options: OrderStatus[];
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  currentStatus,
  orderId,
  orderNumber,
  onStatusChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

	// se till att menyn stängs om man klickar utanför menyn
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (newStatus: OrderStatus) => {
    onStatusChange(orderId, orderNumber, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="custom__dropdown" ref={dropdownRef}>
      <button 
        className={`dropdown__toggle status--${currentStatus}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        Ändra status
      </button>

      {isOpen && (
        <ul className="dropdown__menu">
          {options
            .filter(option => option !== currentStatus)
            .map(option => (
              <li 
                key={option} 
                className={`dropdown__item status--${option}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export { StatusDropdown };