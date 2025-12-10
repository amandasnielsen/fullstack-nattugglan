import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useState, useEffect } from 'react';
import { useOrderStore } from '@nattugglan/core/state/orderStore';
import { OrderHistoryList } from './components/OrderHistoryList';

function MyOrdersPage() {
	const { guestId, previousOrders, isLoading, fetchOrders } = useOrderStore();
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	useEffect(() => {
		if (guestId) {
			fetchOrders();
		}
	}, [guestId, fetchOrders]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchOrders(name, phoneNumber);
	};

	const sortedOrders = previousOrders.sort((a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);

		return dateB.getTime() - dateA.getTime();
	});

	if (isLoading) {
		return <div>Laddar orderhistorik....</div>;
	}

	return (
		<article className="orderHistory">
			<NavBar />
			<Footer />
			<h1>Mina Beställningar</h1>
			<ContentContainer>
				{guestId ? (
					<div className="orderHistory__container">
						<p className="orderHistory__guestId">{guestId}</p>
						<OrderHistoryList orders={sortedOrders} />
					</div>
				) : (
					<div className="orderHistory">
						<h2 className="orderHistory__title">Hitta dina tidigare ordrar</h2>
						<p className="orderHistory__text">
							Vänligen ange ditt namn och telefonnummer för att hämta dina
							tidigare ordrar
						</p>

						<form className="orderHistory__form" onSubmit={handleSubmit}>
							<div className="orderHistory__formContent">
								<label className="orderHistory__label">Namn:</label>
								<input
									className="orderHistory__input"
									type="text"
									placeholder="Namn"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<label className="orderHistory__label">Telefonnummer:</label>
								<input
									className="orderHistory__input"
									type="tel"
									placeholder="Telefonnummer"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									required
								/>
							</div>
							<button className="orderHistory__button" type="submit">
								Hämta Ordrar
							</button>
						</form>
					</div>
				)}
			</ContentContainer>
		</article>
	);
}

export { MyOrdersPage };
