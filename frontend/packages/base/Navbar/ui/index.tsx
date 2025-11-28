import './index.css';
import Logo from './assets/logo.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

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
		</header>
	);
}

export { NavBar };
