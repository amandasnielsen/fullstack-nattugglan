import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useParams } from 'react-router-dom';
import fetchOrderDetails from '../data/fetchOrderDetail';
import { useState, useEffect } from 'react';
import type { CartItem } from '@nattugglan/core';
import { Button } from '@nattugglan/button';

interface orderDetailInterface {
	orderNumber: string;
	guestId: string;
	totalPrice: number;
	items: CartItem[];
	status: 'Pending' | 'Confirmed' | 'Ready' | 'Delivered' | 'Cancelled';
	createdAt: string;
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
				setIsLoading(false);
			})
			.catch((error: any) => {
				setError(error);
				setIsLoading(false);
			});
	}, [orderNumber]);

	useEffect(() => {
		console.log('orderdata: ', orderData);
	}, [orderData]);

	if (isLoading || !orderData) {
		return <div>Hämtar order...</div>;
	}
	if (error) {
		return <div>Fel vid hämtning av order..</div>;
	}

	const { guestId, totalPrice, items, status, createdAt } =
		orderData as orderDetailInterface;

	const itemsByCategory = items.reduce<GroupedItems>((acc, item) => {
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

	return (
		<>
			<NavBar />
			<Footer />
			<h1>Orderbekräftelse</h1>
			<ContentContainer>
				<section className="ConfirmationPage">
					<h3 className="Confirmation__ordnr">Order #{orderNumber}</h3>
					<section className="Confirmation__itemList">
						{sortedCategories.map((categoryName) => (
							<div key={categoryName} className="item__cards">
								<h3 className="item__categoryName">{categoryName}</h3>
								{itemsByCategory[categoryName].map((item, index) => (
									<div key={index} className="item__items">
										<p>{item.name}</p>
										<p>
											{item.quantity}st {item.price}:-
										</p>
									</div>
								))}
							</div>
						))}
					</section>
					<p className="item__totalprice">Totalt: {totalPrice}:-</p>
					<article className="Confirmation__info">
						<section className="Confirmation__info-top">
							<p>guestId: {guestId}</p>
							<p>{formattedDate}</p>
						</section>
						<section className="Confirmation__info-bottom">
							<button className="Confirmation__changeBtn">
								Ändra beställning
							</button>
							<div className="Confirmation__status">
								<p>Status</p>
								<p>{status}</p>
							</div>
						</section>
					</article>
				</section>
			</ContentContainer>
		</>
	);
}

export { OrderConfirmationPage };
