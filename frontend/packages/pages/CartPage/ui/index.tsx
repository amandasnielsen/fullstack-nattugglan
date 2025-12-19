import './index.css';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { Button } from '@nattugglan/button';
import { QuantityControl } from '@nattugglan/quantitycontrol';
import { useCartStore } from '@nattugglan/core';

function CartPage() {
	const { items, totalPrice, totalQuantity } = useCartStore();
	const navigate = useNavigate();

	const handleCheckout = () => {
		navigate('/payment');
	};

	return (
		<div className="cart__page">
			<NavBar />

			<h1>Varukorg</h1>

			<ContentContainer>
				{totalQuantity === 0 ? (
					<p className="empty__message">Din varukorg är tom.</p>
				) : (
					<div className="menu__list">
						{items.map((cartItem) => {
							const itemTotal = cartItem.price * cartItem.quantity;
							const description = cartItem.ingredients.join(', ');

							return (
								<div key={cartItem._id} className="menu__item-card">
									<div className="item__details">
										<h3 className="item__name">{cartItem.name}</h3>
										<p className="item__description">{description}</p>
									</div>

									<div className="item__price-control">
										<span className="item__price">{itemTotal} kr</span>
										<QuantityControl item={cartItem as any} />
									</div>
								</div>
							);
						})}
					</div>
				)}
			</ContentContainer>

			<div className="cart__summary-wrapper">
				<h2 className="total__label">Totalt: {totalPrice} kr</h2>

				<Button
					fullWidth={true}
					onClick={handleCheckout}
					disabled={totalQuantity === 0}
					className="order__button"
					variant="secondary"
				>
					Beställ
				</Button>
			</div>

			<Footer />
		</div>
	);
}

export { CartPage };
