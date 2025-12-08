import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core';

type OrderStatus = 'Pending' | 'Confirmed' | 'Ready' | 'Delivered' | 'Cancelled';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  _id: string; 
	name: string,
  orderNumber: string;
  status: OrderStatus;
  totalPrice: number;
  items: OrderItem[];
}

const STATUS_ORDER: OrderStatus[] = [
  'Pending', 
  'Confirmed', 
  'Ready', 
  'Delivered', 
  'Cancelled'
];

const STATUS_OPTIONS: OrderStatus[] = STATUS_ORDER.filter(s => s !== 'Cancelled'); 


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

  // Funktion för att hantera statusändring (simulerad)
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    console.log(`Ändrar order ${orderId} till status: ${newStatus}`);

    setOrders(prevOrders => 
      prevOrders ? prevOrders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ) : null
    );
  };


  // Gruppera och sortera ordrarna (Pending först)
  const groupedOrders = useMemo(() => {
    if (!orders) return {} as Record<OrderStatus, Order[]>;

    const initialGroups: Record<OrderStatus, Order[]> = {
      'Pending': [], 
      'Confirmed': [], 
      'Ready': [], 
      'Delivered': [], 
      'Cancelled': [],
    };

    // Använder reduce för att fylla den fördefinierade strukturen
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
                      <span className="order__number">Order #{order.orderNumber} - {order.name}</span>
                      <span className={`order__status order__status--${order.status}`}>{order.status}</span>
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
												{(order.status !== 'Delivered' && order.status !== 'Cancelled') && (
													<select 
														className="status__dropdown"
														value={order.status}
														onChange={(e) => 
															handleStatusChange(order._id, e.target.value as OrderStatus)
														}
													>
														{STATUS_OPTIONS.map(option => (
															<option key={option} value={option}>
																{option}
															</option>
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