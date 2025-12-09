import './index.css';
import Logo from './assets/logo.png';
import CartIcon from './assets/cart.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCartStore } from '@nattugglan/core';
import { useOrderStore } from '@nattugglan/core/state/orderStore';

function NavBar() {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const orderNumber = useOrderStore((state) => state.orderNumber);


	const totalQuantity = useCartStore((state) => state.totalQuantity);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<section className="navbar">
			<header className="navbar__container-phone">
				<div>
					<NavLink to="/menu">
						<img src={Logo} className="navbar__logo" alt="Företagslogotyp" />
					</NavLink>
				</div>

				<div className="navbar__icons-right">
					<div className="navbar__icons-right">
						<NavLink to="/cart" className="navbar__cart-link">
							{totalQuantity > 0 && (
								<>
									<img
										src={CartIcon}
										className="navbar__cart-icon"
										alt="Kundkorg"
									/>
									<span className="navbar__cart-badge">{totalQuantity}</span>
								</>
							)}
						</NavLink>

						<div
							className={`navbar__menuIcon ${menuOpen ? 'open' : ''}`}
							onClick={toggleMenu}
							aria-label={menuOpen ? 'Stäng Meny' : 'Öppna Meny'}
							role="button"
						>
							<div className="bar bar1"></div>
							<div className="bar bar2"></div>
							<div className="bar bar3"></div>
						</div>
					</div>
				</div>

				<nav className={`navbar__menu ${menuOpen ? 'visible' : ''}`}>
					<div className="navbar__menu-top">
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
							}
							to="/menu"
							onClick={toggleMenu}
						>
							Meny
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
							}
							to={`/orderstatus/${orderNumber}`}
							onClick={toggleMenu}
						>
							Orderstatus
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
							}
							to="/myorders"
							onClick={toggleMenu}
						>
							Mina Beställningar
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
							}
							to="/aboutUs"
							onClick={toggleMenu}
						>
							Om oss
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
							}
							to="/maps"
							onClick={toggleMenu}
						>
							Vart finns vi?
						</NavLink>
					</div>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
						}
						to="/login"
						onClick={toggleMenu}
					>
						Logga in som Admin
					</NavLink>
				</nav>
			</header>

			<header className="navbar__container-desktop">
				<section className="navbar__container-span">
					<div>
						<NavLink to="/menu">
							<img src={Logo} className="navbar__logo" alt="Företagslogotyp" />
						</NavLink>
					</div>
					<div className="navbar__desktop-group">
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to="/menu"
							onClick={toggleMenu}
						>
							Meny
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to={`/orderstatus/${orderNumber}`}
							onClick={toggleMenu}
							>
							Orderstatus
							</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to="/myorders"
							onClick={toggleMenu}
						>
							Beställningar
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to="/aboutUs"
							onClick={toggleMenu}
						>
							Om oss
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to="/maps"
							onClick={toggleMenu}
						>
							Vart finns vi?
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to="/login"
							onClick={toggleMenu}
						>
							Admin
						</NavLink>
					</div>
					<section className="cart__desktop">
						<div className="navbar__desktop-cart">
							<NavLink to="/cart" className="navbar__cart-link">
								{totalQuantity > 0 && (
									<>
										<img
											src={CartIcon}
											className="navbar__cart-icon"
											alt="Kundkorg"
										/>

										<span className="navbar__cart-badge">{totalQuantity}</span>
									</>
								)}
							</NavLink>
						</div>
					</section>
				</section>
			</header>
		</section>
	);
}

export { NavBar };
