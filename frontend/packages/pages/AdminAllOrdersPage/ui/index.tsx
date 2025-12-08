import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core';

type OrderStatus = 'Pending' | 'Confirmed' | 'Ready' | 'Done' | 'Cancelled';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  _id: string; 
  orderNumber: string;
  status: OrderStatus;
  totalPrice: number;
  items: OrderItem[];
  name: string;
  createdAt: string; 
}

// de kategorier som syns på sidan
const STATUS_ORDER: OrderStatus[] = [
  'Pending', 
  'Confirmed', 
  'Ready',
	'Done', 
  'Cancelled'
];

// vad som går att ändra till i backend
const STATUS_OPTIONS: OrderStatus[] = [
	'Confirmed', 
	'Ready', 
	'Done',
	'Cancelled'
]; 

// formaterar datumet som i orderbekräftelsen
const formatOrderDate = (dateString: string): string => {
	const dateObject = new Date(dateString);
	return dateObject.toLocaleDateString('sv-SE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

function AdminAllOrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/admin/orders', {
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
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data: Order[] = await response.json();
        setOrders(data);

      } catch (error) {
        console.error("Fel vid hämtning av ordrar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate, logout]);

  const handleStatusChange = async (orderId: string, orderNumber: string, newStatus: OrderStatus) => {
    if (!token) return;

    try {
        const response = await fetch(`http://localhost:3000/api/admin/orders/${orderNumber}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.status === 401 || response.status === 403) {
            logout();
            navigate('/access-denied');
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Kunde inte uppdatera status: ${response.status}`);
        }

        // Uppdatera det lokala state med den nya statusen
        setOrders(prevOrders => 
            prevOrders ? prevOrders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            ) : null
        );
        console.log(`Order ${orderNumber} uppdaterad till ${newStatus}`);

    } catch (error: any) {
        console.error("Fel vid statusuppdatering:", error);
        alert(`Fel: ${error.message}. Kontrollera konsolen.`);
    }
  };


  // Gruppera och sortera ordrarna (Pending först)
  const groupedOrders = useMemo(() => {
    if (!orders) return {} as Record<OrderStatus, Order[]>;

    const initialGroups: Record<OrderStatus, Order[]> = {
      'Pending': [], 
      'Confirmed': [], 
      'Ready': [], 
      'Done': [], 
      'Cancelled': [],
    };

    const grouped = orders.reduce((acc, order) => {
      if (acc[order.status]) { 
        (acc[order.status] as Order[]).push(order);
      }
      return acc;
    }, initialGroups); 
    
    return grouped;
  }, [orders]);


  if (loading) {
    return (
      <>
        <NavBarAdmin />
        <ContentContainer><p className="loading__message">Laddar beställningar...</p></ContentContainer>
        <Footer />
      </>
    );
  }
  
  return (
    <section className="allorders__page">
      <NavBarAdmin />
      <h1>Alla beställningar</h1>
      <ContentContainer>
        <div className="orders__container">
            
          {STATUS_ORDER.map(statusKey => (
            <div key={statusKey} className="order__group">

              {groupedOrders[statusKey] && groupedOrders[statusKey].length > 0 && (
                <h2 className="group__title">{statusKey}</h2>
              )}

              <div className="order__list">
                {groupedOrders[statusKey]?.map(order => (
                  <div key={order._id} className="order__card">

                    <div className="order__header">			
                   		<span className="order__number">Order #{order.orderNumber}</span>
                     	<span className={`order__status order__status--${order.status}`}>{order.status}</span>                   
										 </div>

										<div className="order__header-two">
                     	<span className="order__name">Namn: {order.name}</span>                     
											<span className="order__date">{formatOrderDate(order.createdAt)}</span>
                   	</div>

                    <div className="order__products-list"> 
                      {order.items.map((item, index) => (
                          <div key={index} className="order__product-item">
                            <span>{item.name}</span>
                            <span className="product__quantity">x{item.quantity}</span>
                          </div>
                      ))}
                    </div>

                    <div className="order__details-footer">
                        <p className="order__price">Totalt: {order.totalPrice} kr</p>
                        
                        <div className="order__action">
                            {(order.status !== 'Done' && order.status !== 'Cancelled') && (
															<select 
																className="status__dropdown"
																value={order.status}
																onChange={(e) => 
																	handleStatusChange(order._id, order.orderNumber, e.target.value as OrderStatus)
																}
															>
																<option value={order.status}>
																	{order.status}
																</option>

																{STATUS_OPTIONS.map(option => (
																	order.status !== option && (
																		<option key={option} value={option}>
																				{option}
																		</option>
																	)
																))}
															</select>
                            )}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
            
        </div>
      </ContentContainer>
      <Footer />
    </section>
  );
}

export {AdminAllOrdersPage};



