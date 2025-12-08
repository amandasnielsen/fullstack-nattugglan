import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core';
import { StatusDropdown } from '@nattugglan/statusdropdown';
import { Button } from '@nattugglan/button'; 

type OrderStatus = 'Pending' | 'Confirmed' | 'Ready' | 'Done' | 'Cancelled';
type FilterStatus = OrderStatus | 'All';

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

// de kategorier som syns på sidan och i sorteringen
const STATUS_ORDER: OrderStatus[] = [
  'Pending', 
  'Confirmed', 
  'Ready',
  'Done', 
  'Cancelled'
];

// alternativ för filterknapparna
const FILTER_OPTIONS: FilterStatus[] = ['All', ...STATUS_ORDER];

// vad som går att ändra till i backend
const STATUS_OPTIONS: OrderStatus[] = [
  'Confirmed', 
  'Ready', 
  'Done',
  'Cancelled'
];

// mappning för rubriker
const STATUS_DISPLAY_NAMES: Record<FilterStatus, string> = {
  'All': 'Visa Alla',
  'Pending': 'Pending',
  'Confirmed': 'Confirmed',
  'Ready': 'Ready for pickup', // Den uppdaterade titeln
  'Done': 'Done',
  'Cancelled': 'Cancelled',
};

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
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('All'); 
  
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout); 
  const navigate = useNavigate();

  // hämtar ordrar från backend
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

			setOrders(prevOrders => 
				prevOrders ? prevOrders.map(order => 
					order._id === orderId ? { ...order, status: newStatus } : order
				) : null
			);
			console.log(`Order ${orderNumber} uppdaterad till ${newStatus}`);

    } catch (error: any) {
			console.error("Fel vid statusuppdatering:", error);
    }
  };


  // gruppera och sortera ordrarna (pending först)
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
      if (acc[order.status as OrderStatus]) { 
        (acc[order.status as OrderStatus]).push(order);
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

			<div className="filter__bar-orders">
				{FILTER_OPTIONS.map(filterKey => (
					<Button
						key={filterKey}
						variant={activeFilter === filterKey ? 'filterActive' : 'filter'}
						fullWidth={false}
						onClick={() => setActiveFilter(filterKey)}
						className="filter__button-orders"
					>
						{STATUS_DISPLAY_NAMES[filterKey]}
					</Button>
				))}
			</div>

      <ContentContainer>
        
        <div className="orders__container">
            
          {STATUS_ORDER.map(statusKey => {
            const ordersInGroup = groupedOrders[statusKey];
            const shouldRenderGroup = (
              activeFilter === 'All' || activeFilter === statusKey
            ) && ordersInGroup && ordersInGroup.length > 0;
            
            if (!shouldRenderGroup) {
              return null;
            }
            
            return (
              <div key={statusKey} className="order__group">

                <h2 className="group__title">
                  {STATUS_DISPLAY_NAMES[statusKey]}
                  <span className="order__count">
                    &nbsp;– {ordersInGroup.length} st 
                  </span>
                </h2>

                <div className="order__list">
                  {ordersInGroup.map(order => (
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
                            <StatusDropdown 
                              currentStatus={order.status}
                              orderId={order._id}
                              orderNumber={order.orderNumber}
                              onStatusChange={handleStatusChange}
                              options={STATUS_OPTIONS} 
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
            
        </div>
      </ContentContainer>
      <Footer />
    </section>
  );
}

export {AdminAllOrdersPage};