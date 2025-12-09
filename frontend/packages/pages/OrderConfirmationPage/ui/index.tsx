import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderDetails, putStatusChange } from '../data/fetch.ts';
import { useState, useEffect } from 'react';
import { type CartItem } from '@nattugglan/core';
import { OrderItemsList } from './components/OrderItemList.tsx';
import { OrderTotal } from './components/OrderTotal.tsx';
import { OrderActions } from './components/OrderActions.tsx';
import { updateOrder } from './utils/Orderutils.ts';
import { Button } from '@nattugglan/button';

interface orderDetailInterface {
	orderNumber: string;
	guestId: string;
	totalPrice: number;
	items: CartItem[];
	status: 'Pending' | 'Confirmed' | 'Ready' | 'Done' | 'Cancelled';
	createdAt: string;
	name: string;
}

interface OrderNumberParams {
	orderNumber: string;
}

interface GroupedItems {
	[category: string]: CartItem[];
}

function OrderConfirmationPage() {
	const { orderNumber } = useParams<
		keyof OrderNumberParams
	>() as OrderNumberParams;
	const navigate = useNavigate();
	const [orderData, setOrderData] = useState<orderDetailInterface | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isChange, setIsChange] = useState(false);
	const [editableItems, setEditableItems] = useState<CartItem[]>([]);
	const [originalTotal, setOriginalTotal] = useState<number>(0);
	const [newTotal, setNewTotal] = useState<number>(0);
	const [showPaymentMessage, setShowPaymentMessage] = useState(false);

	// hämta orderDetails
	useEffect(() => {
		if (!orderNumber) {
			setError('Inget ordernummer specificerat i url:n');
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);
		setOrderData(null);

		fetchOrderDetails(orderNumber)
			.then((data) => {
				setOrderData(data);
				setEditableItems(data.items);

				const total = data.items.reduce(
					(sum: number, i: CartItem) => sum + i.price * i.quantity,
					0
				);

				setOriginalTotal(total);
				setNewTotal(total);
				setIsLoading(false);
			})
			.catch((error: any) => {
				setError(error);
				setIsLoading(false);
			});
	}, [orderNumber]);

	const updateLocalQuantity = (id: string, newQty: number) => {
		if (newQty < 0) return;

		const updatedItems = editableItems.map((item) =>
			item._id === id ? { ...item, quantity: newQty } : item
		);

		setEditableItems(updatedItems);

		const total = updatedItems.reduce(
			(sum, i) => sum + i.price * i.quantity,
			0
		);

		setNewTotal(total);
	};

	const changeOrder = () => {
		setIsChange(true);
		setShowPaymentMessage(false);
	};

	const doneChange = async () => {
		try {
			const updatedOrder = await updateOrder(orderNumber, editableItems);

			console.log(updatedOrder);

			setOrderData((prev) =>
				prev
					? {
							...prev,
							items: editableItems,
							totalPrice: updatedOrder.order.totalPrice,
					  }
					: prev
			);

			setShowPaymentMessage(true);
			setIsChange(false);
		} catch (error) {
			console.error('Kunde inte uppdatera ordern:', error);
		}
	};

	const renderPaymentMessage = () => {
		if (!orderData || !showPaymentMessage) return null;

		const difference = newTotal - originalTotal;

		if (difference > 0)
			return (
				<p className="paymentMessage">
					Betala {difference}:- när du hämtar upp din mat
				</p>
			);

		if (difference < 0)
			return (
				<p className="paymentMessage">
					Få tillbaka {-difference} när du hämtar din mat
				</p>
			);

		return null;
	};

	const cancellOrder = async () => {
		const cancellationComment = 'kund avbröt beställningen';
		try {
			const newStatus = await putStatusChange(orderNumber, {
				status: 'Cancelled',
				comment: cancellationComment,
			});

			setOrderData(newStatus);
			setIsChange(false);
			setShowPaymentMessage(false);
		} catch (error) {
			console.error('Fel vid avbokning av order', error);
			setError('Kunde inte avboka ordern. Försök igen.');
		}
	};

	const handleClick = () => {
		if (status === 'Pending' || status === 'Confirmed' || status === 'Ready') {
			navigate(`/orderstatus/${orderNumber}`);
		} else {
			navigate(`/myorders`);
		}
	};

	if (isLoading || !orderData) return <div>Hämtar order...</div>;

	if (error) return <div>Fel vid hämtning av order..</div>;

	const { guestId, status, createdAt, name } = orderData;

	// gruppera items efter kategori
	const itemsByCategory = editableItems.reduce<GroupedItems>((acc, item) => {
		const category = item.category;

		if (!acc[category]) {
			acc[category] = [];
		}

		acc[category].push(item);
		return acc;
	}, {});

	const sortedCategories = Object.keys(itemsByCategory).sort();

	const dateObject = new Date(createdAt);

	const formattedDate = dateObject.toLocaleDateString('sv-SE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const totalPrice = editableItems?.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<section className="ConfirmationPage">
			<NavBar />
			<Footer />

			<h1>Orderbekräftelse</h1>

			<ContentContainer>
				<section className="ConfirmationPage__content">
					<div>
						<h3 className="Confirmation__ordnr">Order #{orderNumber}</h3>

						{/* Item Lista */}
						<OrderItemsList
							sortedCategories={sortedCategories}
							itemsByCategory={itemsByCategory}
							isChange={isChange}
							updateLocalQuantity={updateLocalQuantity}
						/>
					</div>

					{/* totalsumma */}
					<OrderTotal name={name} totalPrice={totalPrice} />

					{/* OrderInfo och knappar */}
					<OrderActions
						guestId={guestId}
						formattedDate={formattedDate}
						status={status}
						isChange={isChange}
						doneChange={doneChange}
						changeOrder={changeOrder}
						cancellOrder={cancellOrder}
					/>
				</section>
			</ContentContainer>
			{renderPaymentMessage()}
			<div className="Conformation__btnContainer">
				<Button variant="secondary" onClick={handleClick}>
					Följ din beställning
				</Button>
			</div>
		</section>
	);
}

export { OrderConfirmationPage };
