import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { Button } from '@nattugglan/button';
import payment from './assets/payment.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// ta bort sen när du kan hämta kundkorgen och totalpriset
const mockTotal = 589;


function PaymentPage() {
	// hämta cartItems, phoneNumber, clearCart från zustandstore
	const navigate = useNavigate();
	const [phoneNmbr, setPhoneNmbr] = useState('');

	const handlePayment = () => {
		// lägg in telefonnummer och validering i zustandstore och kolla här så de finns ett telefonnummer
		// if (!phoneNmbr || !/^[0-9]+$/.test(phoneNmbr)) {
		if(!phoneNumber) {
			alert('Ange telefonnummer innan du betalar');
			return;
		}

		// Lägg in kundkorgen här
		if (cartItems.length === 0) {
			alert("Kundkorgen är tom")
			return
		}

		const orderNumber = uuidv4().slice(0, 6)}

		const order = {
			orderNumber,
			phoneNumber,
			item: cartItems,
			createdAt: new Date().toISOString()
		}

		try {
			await fetch('/api/orders', {
				mehtod: 'POST',
				header: {'Content-type': 'application/json'},
				body: JSON.stringify(order)
			});

			clearCart()

			
			navigate(`/order/${orderNumber}`);
		} catch (error) {
			console.error("Fel vid betalning: ", error)
			alert("Något gick fel, försök igen")
		}

		console.log('betalat!');
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
						<label className="paymnet__input-label">
							Fyll i telefonnummer:
						</label>
						<input
							className="paymnet__input-number"
							type="tel"
							value={phoneNmbr}
							onChange={(e) => setPhoneNmbr(e.target.value)}
						/>
					</div>
					<p className="paymnet__total">Total: {mockTotal}</p>
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
			<Button
				variant="secondary"
				onClick={handlePayment}
				className="payment__button"
			>
				Betala
			</Button>
			<Footer />
		</section>
	);
}

export { PaymentPage };
