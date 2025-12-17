import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { FooterAdmin } from '@nattugglan/footeradmin';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useState, useEffect, useMemo, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core';
import { StatusDropdown } from '@nattugglan/statusdropdown';
import { Button } from '@nattugglan/button';
import { startOrdersPolling, type Order, type OrderStatus } from '../data/fetchOrders'; 
import { useNotificationStore } from '@nattugglan/core';
import { apiFetch } from '@nattugglan/core/apiClient/apiClient';

type FilterStatus = OrderStatus | 'All';

interface CancelModalState {
  isOpen: boolean;
  orderId: string | null;
  orderNumber: string | null;
  currentComment: string;
}

const STATUS_ORDER: OrderStatus[] = [
  'Pending', 'Confirmed', 'Ready', 'Done', 'Cancelled'
];

const FILTER_OPTIONS: FilterStatus[] = ['All', ...STATUS_ORDER];

const STATUS_OPTIONS: OrderStatus[] = [
  'Confirmed', 'Ready', 'Done', 'Cancelled'
];

// namnen på kategorierna som visas
const STATUS_DISPLAY_NAMES: Record<FilterStatus, string> = {
  'All': 'Visa alla',
  'Pending': 'Pending',
  'Confirmed': 'Confirmed',
  'Ready': 'Ready for pickup',
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
  const [cancelModal, setCancelModal] = useState<CancelModalState>({
    isOpen: false,
    orderId: null,
    orderNumber: null,
    currentComment: '',
  });

  const latestOrdersRef = useRef<Order[] | null>(null); 
  
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout); 
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = startOrdersPolling(
      token,
      logout,
      navigate,
      latestOrdersRef,
      setOrders,
      setLoading,
      loading
    );

    return cleanup;
    
  }, [token, navigate, logout, loading]); 


  const confirmCancel = () => {
    if (!cancelModal.currentComment) {
      return;
    }

    if (cancelModal.orderId && cancelModal.orderNumber) {
      handleStatusChange(
        cancelModal.orderId,
        cancelModal.orderNumber,
        'Cancelled',
        cancelModal.currentComment
      );
    }
    setCancelModal({ isOpen: false, orderId: null, orderNumber: null, currentComment: '' });
  };

  const handleStatusChange = async (orderId: string, orderNumber: string, newStatus: OrderStatus, comment?: string) => {

    const API_STATUS_URL = `/admin/orders/${orderNumber}/status`;
    
    if (!token) return;

    if (newStatus === 'Cancelled' && !comment) {
      setCancelModal({
        isOpen: true,
        orderId,
        orderNumber,
        currentComment: '',
      });
      return;
    }

    try {
      const requestBody: { status: OrderStatus; comment?: string } = { status: newStatus };
      if (newStatus === 'Cancelled' && comment) {
        requestBody.comment = comment;
      }

      const response = await apiFetch(API_STATUS_URL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody), 
      });
      
      const updatedOrder: Order = response; 

      setOrders(prevOrders => 
        prevOrders ? prevOrders.map(order => 
          order._id === orderId ? updatedOrder : order
        ) : null
      );

      useNotificationStore.getState().addNotification(orderNumber);
    
      console.log(`Order ${orderNumber} uppdaterad till ${newStatus}`);

    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        logout();
        navigate('/access-denied');
        return;
      }
      console.error("Fel vid statusuppdatering:", error);
    }
  };
  
  const groupedOrders = useMemo(() => {
    if (!orders) return {} as Record<OrderStatus, Order[]>;

    const initialGroups: Record<OrderStatus, Order[]> = {
      'Pending': [], 'Confirmed': [], 'Ready': [], 
      'Done': [], 'Cancelled': [],
    };

    const grouped = orders.reduce((acc, order) => {
      if (acc[order.status as OrderStatus]) { 
        (acc[order.status as OrderStatus]).push(order);
      }
      return acc;
    }, initialGroups);

    // sortera på nyaste ordrar först
    (Object.keys(grouped) as OrderStatus[]).forEach(statusKey => {
      const group = grouped[statusKey];

      group.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; 
      });
    });
    
    return grouped;
  }, [orders]);


  if (loading) {
    return (
      <>
        <NavBarAdmin />
        <h1>Alla beställningar</h1>
        <ContentContainer><p className="loading__message">Laddar beställningar...</p></ContentContainer>
        <FooterAdmin />
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

                      {order.status === 'Cancelled' && order.cancellationReason && (
                        <div className="cancellation__reason">
                          <p className="reason__label">Orsak:</p>
                          <p className="reason__text">{order.cancellationReason}</p>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            );
          })}
            
        </div>
      </ContentContainer>
      <FooterAdmin />

      {cancelModal.isOpen && (
        <div className="modal__overlay">
          <div className="modal__content">
            <h2>Avbryt Order #{cancelModal.orderNumber}</h2>
            <textarea
              placeholder="Ange anledning..."
              value={cancelModal.currentComment}
              onChange={(e) => setCancelModal(p => ({ ...p, currentComment: e.target.value }))}
            />
            <div className="modal__actions">
              <Button 
                fullWidth={false}
                className="cancel"
                onClick={() => setCancelModal({ isOpen: false, orderId: null, orderNumber: null, currentComment: '' })}
              >
                Avbryt
              </Button>
              <Button 
                fullWidth={false}
                className="confirm"
                onClick={confirmCancel}
              >
                Bekräfta
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export {AdminAllOrdersPage};