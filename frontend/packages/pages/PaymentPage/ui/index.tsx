import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { Button } from '@nattugglan/button';
import payment from './assets/payment.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCartStore } from '@nattugglan/core';
import type { OrderInterface } from '@nattugglan/core';

function PaymentPage() {
	const navigate = useNavigate();
	const { items, totalPrice, clearCart } = useCartStore();
	const [phoneNumber, setPhoneNumber] = useState('');

	const handlePayment = async () => {
		if (!phoneNumber) {
			alert('Ange telefonnummer innan du betalar');
			return;
		}

		if (items.length === 0) {
			alert('Kundkorgen är tom');
			return;
		}

		const orderNumber: string = uuidv4().slice(0, 5);
		const order: OrderInterface = {
			orderNumber,
			phoneNumber,
			items: items,
			createdAt: new Date().toISOString(),
		};

		try {
			// lägg in api post anropet här

			clearCart();

			navigate(`/order/${orderNumber}`);
		} catch (error) {
			console.error('Fel vid betalning: ', error);
			alert('Något gick fel, försök igen');
		}
		console.log('betalat!');
		console.log(order);
	};

	return (
		<section className="paymentpage">
			<NavBar />
			<h1>Betala</h1>
			<ContentContainer>
				<article className="payment__boxContent">
					<img
						className="payment__img"
						src={payment}
						alt="bild på betalningsloga"
					/>
					<div className="payment__input">
						<label className="payment__input-label">
							Fyll i telefonnummer:
						</label>
						<input
							className="payment__input-number"
							type="tel"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>
					<p className="payment__total">Total: {totalPrice}</p>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'payment__menuLink active-link' : 'payment__menuLink'
						}
						to="/menu"
					>
						Tillbaka till meny
					</NavLink>
				</article>
			</ContentContainer>
			<div className="payment__buttonContainer">
				<Button
					variant="secondary"
					onClick={handlePayment}
					className="payment__button"
				>
					Betala
				</Button>
			</div>
			<Footer />
		</section>
	);
}

export { PaymentPage };
