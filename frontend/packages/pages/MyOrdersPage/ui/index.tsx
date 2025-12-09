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

	if (isLoading) {
		return <div>Laddar orderhistorik....</div>;
	}

	if (guestId && previousOrders.length > 0) {
		return (
			<div>
				<h2>Tidigare Beställningar</h2>
				<p>Här är dina tidigare ordrar! {guestId}</p>
				<OrderHistoryList orders={previousOrders} />
			</div>
		);
	}

	if (!guestId) {
		return (
			<div>
				<h2>Hitta dina tidigare ordrar</h2>
				<p>
					Vänligen ange ditt namn och telefonnummer för att hämta dina tidigare
					ordrar
				</p>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Namn"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<input
						type="tel"
						placeholder="Telefonnummer"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
					/>
					<button type="submit">Hämta Ordrar</button>
				</form>
			</div>
		);
	}

	return (
		<>
			<NavBar />
			<Footer />
			<h1>Mina Beställningar</h1>
			<ContentContainer>
				<p>
					Du har ingen registrerad orderhistorik än. Lägg din första beställning
					nu!
				</p>
			</ContentContainer>
		</>
	);
}

export { MyOrdersPage };
