import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { Button } from '@nattugglan/button';
import payment from './assets/payment.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// när api o store finns
// importera och byt ut useMockStore till den riktiga
// api byts ut till ett post anrop, om apiet returnerar något så kan man spara de till state eller navigera vidare baserat på svaret
// kan ta bort localphone helt om man litar på storen

// ---- typer ----
interface CartItem {
	id: string;
	name: string;
	price: number;
}

interface Order {
	orderNumber: string;
	phoneNumber: string;
	item: CartItem[];
	createdAt: string;
}

// --- Mockad zustand store ---
const useMockStore = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{ id: '1', name: 'Pizza', price: 100 },
		{ id: '2', name: 'Sallad', price: 50 },
	]);

	const [phoneNumber, setPhoneNumber] = useState('');

	const clearCart = () => setCartItems([]);

	return { cartItems, phoneNumber, setPhoneNumber, clearCart };
};

function PaymentPage() {
	// hämta cartItems, phoneNumber, clearCart från zustandstore
	const navigate = useNavigate();

	const { cartItems, phoneNumber, setPhoneNumber, clearCart } = useMockStore();
	const [localPhone, setLocalPhone] = useState('');
	const mockTotal: number = cartItems.reduce(
		(sum, item) => sum + item.price,
		0
	);

	const handlePayment = async () => {
		const finalPhone: string = localPhone || phoneNumber;
		if (!finalPhone) {
			alert('Ange telefonnummer innan du betalar');
			return;
		}

		// Lägg in kundkorgen här
		if (cartItems.length === 0) {
			alert('Kundkorgen är tom');
			return;
		}

		const orderNumber: string = uuidv4().slice(0, 5);
		const order: Order = {
			orderNumber,
			phoneNumber: finalPhone,
			item: cartItems,
			createdAt: new Date().toISOString(),
		};

		try {
			// mock api- svar
			await new Promise<void>((resolve) => setTimeout(resolve, 500));
			console.log('Mock api skickar order: ', order);

			// await fetch('/api/orders', {
			// 	mehtod: 'POST',
			// 	headers: {'Content-type': 'application/json'},
			// 	body: JSON.stringify(order)
			// });

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
						<label className="paymnet__input-label">
							Fyll i telefonnummer:
						</label>
						<input
							className="payment__input-number"
							type="tel"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>
					<p className="payment__total">Total: {mockTotal}</p>
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
