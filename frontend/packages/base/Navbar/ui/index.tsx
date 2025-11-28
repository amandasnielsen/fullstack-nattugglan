import './index.css';
import Logo from './assets/logo.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	// Tror att man får lägga in något state eller liknande om vad som ska visas när man är inloggad som admin och när man inte är det. 
	// tex. Visa detta om man är inloggad annars visa detta
	//Lägg även till funktion för att kunna logga ut när de finns användare

	return (
		<header className="navbar__container">
			<div>
				<NavLink to="/menu">
					<img src={Logo} className="navbar__logo" alt="Företagslogotyp" />
				</NavLink>
			</div>

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
						to="/allorders"
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
						to="/stock"
						onClick={toggleMenu}
					>
						Lagerstatus
					</NavLink>
				</div>
			<button className="navbar__logout">Logga ut</button>
			</nav>
			*/}


		</header>
	);
}

export { NavBar };
