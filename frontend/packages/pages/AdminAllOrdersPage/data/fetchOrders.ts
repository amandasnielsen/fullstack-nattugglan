import { apiFetch } from '@nattugglan/core/apiClient/apiClient';

export type OrderStatus =
	| 'Pending'
	| 'Confirmed'
	| 'Ready'
	| 'Done'
	| 'Cancelled';
export interface OrderItem {
	name: string;
	quantity: number;
}

export interface Order {
	_id: string;
	orderNumber: string;
	status: OrderStatus;
	totalPrice: number;
	items: OrderItem[];
	name: string;
	createdAt: string;
	cancellationReason?: string;
}

const POLLING_INTERVAL = 5000;

async function fetchOrdersData(
	token: string | null,
	logout: () => void,
	navigate: (path: string) => void
): Promise<Order[]> {
	if (!token) {
		navigate('/login');
		throw new Error('No token provided.');
	}

	try {
		const data = await apiFetch('/admin/orders', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error: any) {
		console.error('Authentication failed or access denied.');

		if (error.status === 401 || error.status === 403) {
			logout();
			navigate('/access-denied');
		}

		throw error;
	}
}

export function startOrdersPolling(
	token: string | null,
	logout: () => void,
	navigate: (path: string) => void,
	latestOrdersRef: React.MutableRefObject<Order[] | null>,
	setOrders: React.Dispatch<React.SetStateAction<Order[] | null>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	loading: boolean
) {
	let isCancelled = false;

	const fetchAndCheckOrders = async () => {
		if (!token || isCancelled) return;

		console.log('Hämtar nya ordrar från backend (Polling)');

		try {
			const data = await fetchOrdersData(token, logout, navigate);

			// jämför de nya hämtade datan med den befintliga datan
			if (JSON.stringify(latestOrdersRef.current) !== JSON.stringify(data)) {
				latestOrdersRef.current = data;
				setOrders(data);
			}
		} catch (error) {
			console.error('Fel under polling:', error);
		} finally {
			if (loading) {
				setLoading(false);
			}
		}
	};

	fetchAndCheckOrders();
	const intervalId = setInterval(fetchAndCheckOrders, POLLING_INTERVAL);

	return () => {
		clearInterval(intervalId);
		isCancelled = true;
	};
}
