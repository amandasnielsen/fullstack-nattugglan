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
	_id: string; // Lägg till _id för nyckelhantering och identifiering
	orderNumber: string;
	status: OrderStatus;
	totalPrice: number;
	items: OrderItem[];
	// Lägg till andra fält som createdAt, name, etc. här
}

const STATUS_ORDER: OrderStatus[] = [
	'Pending', 
	'Confirmed', 
	'Ready', 
	'Delivered', 
	'Cancelled'
];

const STATUS_OPTIONS: OrderStatus[] = STATUS_ORDER.filter(s => s !== 'Cancelled'); // Tar bort Cancelled från dropdown

function AdminAllOrdersPage() {
	const [orders, setOrders] = useState<Order[] | null>(null);
	const [loading, setLoading] = useState(true);
	
	const token = useAuthStore(state => state.token);
	const logout = useAuthStore(state => state.logout); 
	const navigate = useNavigate();

	// Funktionalitet för att hantera API-anrop för att hämta ordrar
	useEffect(() => {
		const fetchOrders = async () => {
			if (!token) {
				navigate('/login'); // Skickar till login om token saknas
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

	// Funktion för att hantera statusändring (Ska byggas i ett senare steg)
	const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
		console.log(`Ändrar order ${orderId} till status: ${newStatus}`);
		
		// I en fullständig app skulle du här skicka en PUT/PATCH-förfrågan till backend
		// och sedan uppdatera 'orders'-state med det nya värdet.
		
		// Simulerad State Update (För att få gränssnittet att reagera):
		setOrders(prevOrders => 
			prevOrders ? prevOrders.map(order => 
				order._id === orderId ? { ...order, status: newStatus } : order
			) : null
		);
	};


	// Gruppera och sortera ordrarna (Pending först)
	const groupedOrders = useMemo(() => {
		if (!orders) return {} as Record<OrderStatus, Order[]>; // FIX 1: Tydlig cast om orders är null

		// FIX 2: Använd en Record<> typ som initial struktur
		const initialGroups: Record<OrderStatus, Order[]> = {
			'Pending': [], 
			'Confirmed': [], 
			'Ready': [], 
			'Delivered': [], 
			'Cancelled': [],
		};

		// Använd reduce eller forEach för att fylla den fördefinierade strukturen
		const grouped = orders.reduce((acc, order) => {
			// Använd en typkontroll för att vara extra säker
			if (acc[order.status]) { 
				acc[order.status].push(order);
			}
			return acc;
		}, initialGroups); // Passa in den fullständiga typen som startvärde
		
		return grouped;
	}, [orders]);


	// --- RENDERING ---

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
		<section className="admin__page">
			<NavBarAdmin />
			<h1>Alla beställningar</h1>
			<ContentContainer>
				<div className="orders__container">
						
					{STATUS_ORDER.map(statusKey => (
						<div key={statusKey} className="order__group">
								
							{/* Rendera rubriken endast om det finns ordrar i gruppen */}
							{groupedOrders[statusKey] && groupedOrders[statusKey].length > 0 && (
									<h2 className="group__title">{statusKey}</h2>
							)}

							<div className="order__list">
								{groupedOrders[statusKey]?.map(order => (
									<div key={order._id} className="order__card">
										
										{/* HEADER OCH STATUSVISNING */}
										<div className="order__header">
											<span className="order__number">Order #{order.orderNumber}</span>
											<span className={`order__status order__status--${order.status}`}>{order.status}</span>
										</div>
										
										{/* PRODUKT DETALJER */}
										<div className="order__details">
											<p className="order__products">
												{/* Visar alla produkter */}
												{order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
											</p>
											<p className="order__price">Totalt: {order.totalPrice} kr</p>
										</div>

										{/* STATUS ÄNDRINGSKNAPP/DROPDOWN */}
										<div className="order__action">
											{/* Endast visa dropdown om status inte är Delivered/Cancelled */}
											{(order.status !== 'Delivered' && order.status !== 'Cancelled') && (
												<select 
													className="status__dropdown"
													value={order.status}
													// Anropa handleStatusChange med ny status
													onChange={(e) => 
														handleStatusChange(order._id, e.target.value as OrderStatus)
													}
											>
													{STATUS_OPTIONS.map(option => (
														<option key={option} value={option}>
															Ändra status
														</option>
													))}
												</select>
											)}
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