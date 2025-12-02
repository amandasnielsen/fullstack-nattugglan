import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { Button } from '@nattugglan/button';
import { QuantityControl } from '@nattugglan/quantitycontrol';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useMenuStore, useCartStore } from '@nattugglan/core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function MenuPage() {
	const totalQuantity = useCartStore((state) => state.totalQuantity);
	const totalPrice = useCartStore((state) => state.totalPrice);

	const menu = useMenuStore((state) => state.menu);
	const fetchMenu = useMenuStore((state) => state.fetchMenu);

	const navigate = useNavigate();

	useEffect(() => {
		fetchMenu();
	}, [fetchMenu]);

	const handleCheckout = () => {
		navigate('/cart');
	};

	return (
		<>
			<NavBar />

			<h1>Fuel the night!</h1>

			<ContentContainer>
				<div className="menu__list">
					{!menu || menu.length === 0 ? (
						<p className="loading__message">Laddar menyn...</p>
					) : (
						menu.map((item) => {
							const description = item.ingredients.join(', ');

							return (
								<div key={item._id} className="menu__item-card">
									<div className="item__details">
										<h3 className="item__name">{item.name}</h3>
										<p className="item__description">{description}</p>
									</div>

									<div className="item__price-control">
										<span className="item__price">{item.price}:-</span>
										<QuantityControl item={item} />
									</div>
								</div>
							);
						})
					)}
				</div>
			</ContentContainer>

			<div className="button__checkout-wrapper">
				<Button
					fullWidth={false}
					onClick={handleCheckout}
					disabled={totalQuantity === 0}
					className="button__checkout"
					variant="secondary"
				>
					{/* Endast priset visas nu */}
					Beställ - {totalPrice} kr
				</Button>
			</div>

			<Footer />
		</>
	);
}

export { MenuPage };
