import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useParams } from 'react-router-dom';
import fetchOrderDetails from '../data/fetchOrderDetail';
import { useState, useEffect } from 'react';
import { type CartItem } from '@nattugglan/core';

interface orderDetailInterface {
	orderNumber: string;
	guestId: string;
	totalPrice: number;
	items: CartItem[];
	status: 'Pending' | 'Confirmed' | 'Ready' | 'Delivered' | 'Cancelled';
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
	const [orderData, setOrderData] = useState<orderDetailInterface | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isChange, setIsChange] = useState(false);
	const [editableItems, setEditableItems] = useState<CartItem[]>([]);
	const [originalTotal, setOriginalTotal] = useState<number>(0);
	const [newTotal, setNewTotal] = useState<number>(0);
	const [showPaymentMessage, setShowPaymentMessage] = useState(false);

	//hämta orderDetails
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

	const updateOrder = async (orderNumber: string, items: CartItem[]) => {
		const totalPrice = items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);

		const payload = {
			items: items.map((item) => ({
				...item,
			})),
			totalPrice,
		};

		const response = await fetch(
			`http://localhost:3000/api/order/${orderNumber}`,
			{
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) throw new Error('Kunde inte uppdatera ordern');
		return response.json();
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

	if (isLoading || !orderData) return <div>Hämtar order...</div>;
	if (error) return <div>Fel vid hämtning av order..</div>;

	const { guestId, status, createdAt, name } = orderData;

	//gruppera items efter kategori
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

						{/*Item Lista*/}
						<section className="Confirmation__itemList">
							{sortedCategories.map((categoryName) => (
								<div key={categoryName} className="item__cards">
									<h3 className="item__categoryName">{categoryName}</h3>

									{itemsByCategory[categoryName].map((item, index) => (
										<div key={index} className="item__items">
											<p>{item.name}</p>
											{!isChange && (
												<p>
													{item.quantity}st {item.price}:-
												</p>
											)}
											{/* Visa ändringar endast om man är i ändringsläge */}
											{isChange && (
												<div className="change__container">
													<p>{item.price}:-</p>
													<div className="change__button-container">
														<button
															className="quantity__button"
															onClick={() =>
																updateLocalQuantity(item._id, item.quantity - 1)
															}
														>
															-
														</button>
														<span>{item.quantity}</span>
														<button
															className="quantity__button"
															onClick={() =>
																updateLocalQuantity(item._id, item.quantity + 1)
															}
														>
															+
														</button>
													</div>
												</div>
											)}
										</div>
									))}
								</div>
							))}
						</section>
					</div>

					{/* totalsumma */}
					<div className="item__bottom">
						<p className="item__name">{name}</p>
						<p className="item__totalprice">Totalt: {totalPrice}:-</p>
					</div>

					{/* OrderInfo o knappar */}
					<article className="Confirmation__info">
						<section className="Confirmation__info-top">
							<p>guestId: {guestId}</p>
							<p>{formattedDate}</p>
						</section>

						<section className="Confirmation__info-bottom">
							{status === 'Pending' && (
								<button
									className="Confirmation__changeBtn"
									onClick={isChange ? doneChange : changeOrder}
								>
									{isChange ? 'Bekräfta' : 'Ändra beställning'}
								</button>
							)}

							<div className="Confirmation__status">
								<p>Status</p>
								<p>{status}</p>
							</div>
						</section>
					</article>
				</section>
			</ContentContainer>
			{renderPaymentMessage()}
		</section>
	);
}

export { OrderConfirmationPage };
