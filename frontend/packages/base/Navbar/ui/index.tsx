import './index.css';
import Logo from './assets/logo.png';
import CartIcon from './assets/cart.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCartStore } from '@nattugglan/core';

function NavBar() {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const totalQuantity = useCartStore((state) => state.totalQuantity);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	// Tror att man får lägga in något state eller liknande om vad som ska visas när man är inloggad som admin och när man inte är det. 
	// tex. Visa detta om man är inloggad annars visa detta
	//Lägg även till funktion för att kunna logga ut när de finns användare

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
					
						{totalQuantity > 0 && (
							<NavLink 
								to="/cart"
								className="navbar__cart-link"
							>
								<img 
									src={CartIcon} 
									className="navbar__cart-icon" 
									alt="Kundkorg" 
								/>

								<span className="navbar__cart-badge">
									{totalQuantity}
								</span>
							</NavLink>
						)}

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
							to="/orderstatus"
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
							Tidigare Beställningar
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

				{/* länkar till när man kan logga in som admin
				
				alla beställningar
				uppdatera menyn
				lagerstatus

				logga ut
				
				<nav className={`navbar__menu ${menuOpen ? 'visible' : ''}`}>
					<div className="navbar__menu-top">
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
							}
							to="/adminallorderspage"
							onClick={toggleMenu}
						>
							Alla Beställningar
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
							}
							to="/updatemenu"
							onClick={toggleMenu}
						>
							Uppdatera Menyn
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__menuLinks active-link' : 'navbar__menuLinks'
							}
							to="/stockpage"
							onClick={toggleMenu}
						>
							Lagerstatus
						</NavLink>
					</div>
				<button className="navbar__logout">Logga ut</button>
				</nav>
				*/}

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
								isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
							}
							to="/menu"
							onClick={toggleMenu}
						>
							Meny
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
							}
							to="/orderstatus"
							onClick={toggleMenu}
						>
							Orderstatus
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
							}
							to="/myorders"
							onClick={toggleMenu}
						>
							Beställningar
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
							}
							to="/aboutUs"
							onClick={toggleMenu}
						>
							Om oss
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
							}
							to="/maps"
							onClick={toggleMenu}
						>
							Vart finns vi?
						</NavLink>
						<NavLink
						className={({ isActive }) =>
							isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
						}
						to="/login"
						onClick={toggleMenu}
					>
						Admin
					</NavLink>
					</div>
				</section>
			</header>

		{/* Admin view på navbar desktop

				alla beställningar
				uppdatera menyn
				lagerstatus

				logga ut
		
			<div className="navbar__desktop-group">
				<NavLink
					className={({ isActive }) =>
						isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
					}
					to="/adminallorderspage"
					onClick={toggleMenu}
				>
					Alla Beställningar
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
					}
					to="/updatemenu"
					onClick={toggleMenu}
				>
					Uppdatera Menyn
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? 'navbar__desktop-links active-link-desktop' : 'navbar__desktop-links'
					}
					to="/stockpage"
					onClick={toggleMenu}
				>
					Lagerstatus
				</NavLink>
				<button className="navbar__logout">Logga ut</button>
			</div>*/}

			{/*<section className="cart__desktop">
				<div className="navbar__desktop-cart">			
					{totalQuantity > 0 && (
						<NavLink 
							to="/cart"
							className="navbar__cart-link"
						>
							<img 
								src={CartIcon} 
								className="navbar__cart-icon" 
								alt="Kundkorg" 
							/>

							<span className="navbar__cart-badge">
								{totalQuantity}
							</span>
						</NavLink>
					)}
				</div>
			</section>*/}
		</section>
	);
}

export { NavBar };
