import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { Button } from '@nattugglan/button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCartStore } from '@nattugglan/core';
import type { OrderInterface } from '@nattugglan/core';
import { validateName, validatePhone } from '../data/validation';
import { useOrderStore } from '@nattugglan/core/state/orderStore';

function PaymentPage() {
	const navigate = useNavigate();
	const { items, totalPrice, clearCart } = useCartStore();
	const [mobileNumber, setmobileNumber] = useState('');
	const [name, setName] = useState('');
	const [errors, setErrors] = useState<string[]>([]);

	const handlePayment = async () => {
		const newErrors: string[] = [];
		if (!validateName(name)) {
			newErrors.push('Namnet är ogiltigt');
		}
		if (!validatePhone(mobileNumber)) {
			newErrors.push('Telefonnummret är ogiltigt');
		}

		if (newErrors.length > 0) {
			setErrors(newErrors);
			return;
		}

		if (items.length === 0) {
			setErrors(['Kundkorgen är tom']);
			return;
		}

		const order: OrderInterface = {
			name: name,
			phoneNumber: mobileNumber,
			totalPrice,
			items: items,
			createdAt: new Date().toISOString(),
		};

		try {
			const response = await fetch(`http://localhost:3000/api/order`, {
				method: 'POST',
				headers: {
					//lägg till guest ID-cookien här, och api nyckeln
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(order),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `Serverfel: ${response.status}`);
			}

			const result = await response.json();
			const orderNumber = result.orderNumber;
			useOrderStore.getState().setOrderNumber(result.orderNumber);

			clearCart();

			navigate(`/order/${orderNumber}`);
		} catch (error) {
			console.error('Fel vid betalning: ', error);
			setErrors(['Något gick fel, försök igen']);
		}
	};

	return (
		<section className="paymentpage">
			<NavBar />
			<h1>Betala</h1>
			<ContentContainer>
				<article className="payment__boxContent">
					<h3>Info</h3>
					<div className="payment__input">
						<label className="payment__input-label">Namn:</label>
						<input
							className="payment__input-name"
							type="text"
							placeholder="Anna Andersson"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label className="payment__input-label">
							Fyll i telefonnummer:
						</label>
						<input
							className="payment__input-number"
							type="tel"
							placeholder="076 000 00 00"
							value={mobileNumber}
							onChange={(e) => setmobileNumber(e.target.value)}
						/>

						{errors.map((err, i) => (
							<p key={i} style={{ color: 'red' }}>
								{err}
							</p>
						))}
					</div>
					<div className="paymnet__contentBottom">
						<p className="payment__total">Totalt: {totalPrice} kr</p>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'payment__menuLink active-link' : 'payment__menuLink'
							}
							to="/menu"
						>
							Tillbaka till meny
						</NavLink>
					</div>
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
