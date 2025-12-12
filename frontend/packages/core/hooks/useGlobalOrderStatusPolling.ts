import { useEffect, useCallback, useRef } from 'react'; 
import { useOrderStore } from '@nattugglan/core/state/orderStore';
import { useNotificationStore } from '@nattugglan/core/state/notificationStore';

// global polling funktion som var femte sekund hämtar statusuppdayeringen på den pågående ordern
// om det finns ett aktivt ordernummer.
// denna funktion lyssnas på i App.tsx, så att orderstatus hämtas
// oavsett vilken sida man är inne på.
// detta gör att orderbekräftelsen, orderstatussidan och ringklockan uppdateras när
// admin ändrar statusen
const POLLING_INTERVAL = 5000; 

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface OrderResponse {
  orderNumber: string;
  status: 'Pending' | 'Confirmed' | 'Ready' | 'Cancelled';
}

async function fetchOrderStatus(orderNumber: string): Promise<OrderResponse | null> {
	const res = await fetch(`${BASE_URL}/api/order/${orderNumber}`);
	if (!res.ok) {
		if (res.status === 404) return null;
		throw new Error("Kunde inte hämta orderstatus.");
	}
	return res.json();
}

export const useGlobalOrderStatusPolling = () => {
	const orderNumber = useOrderStore((state) => state.orderNumber); 
	const currentOrder = useOrderStore((state) => state.order); 
	const setOrder = useOrderStore((state) => state.setOrder); 
	const { addNotification, clearNotification } = useNotificationStore();
	const currentOrderRef = useRef(currentOrder);
	
	useEffect(() => {
		currentOrderRef.current = currentOrder;
	}, [currentOrder]);

	const pollStatus = useCallback(async () => {
		if (!orderNumber) {
			clearNotification(); 
			return; 
		}

		try {
			const newOrder = await fetchOrderStatus(orderNumber);

			if (newOrder) {

				if (newOrder.status === 'Ready' || newOrder.status === 'Cancelled') {
					clearNotification(); 
				}

				if (currentOrderRef.current && currentOrderRef.current.status !== newOrder.status) {
					addNotification(orderNumber);
				}
				
				setOrder(newOrder); 
					
			} else {
				clearNotification(); 
			}
		} catch (e) {
			console.error("Polling Error:", e);
		}
	}, [orderNumber, setOrder, addNotification, clearNotification]); 

	useEffect(() => {
		if (orderNumber) {
			pollStatus();
		}

		const intervalId = setInterval(pollStatus, POLLING_INTERVAL);

		return () => clearInterval(intervalId);

	}, [pollStatus, orderNumber]); 
};