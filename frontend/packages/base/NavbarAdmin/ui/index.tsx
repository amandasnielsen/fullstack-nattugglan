import Logo from './assets/logo.png';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core';
import { apiFetch } from '@nattugglan/core/apiClient/apiClient';

function NavBarAdmin() {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { logout } = useAuthStore();

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleLogout = async () => {
		if (menuOpen) {
			toggleMenu();
		}

		try {
			await apiFetch(`/auth/logout`, {
				method: 'POST',
			});
			console.log('Admin logged out from backend.');
		} catch (error) {
			console.error('Logout failed, proceeding with local cleanup.');
		} finally {
			logout();
			navigate('/menu');
		}
	};

	return (
		<section className="navbar">
			<header className="navbar__container-phone">
				<div>
					<img src={Logo} className="navbar__logo" alt="Företagslogotyp" />
				</div>

				<div className="navbar__icons-right">
					<div className="navbar__icons-right">
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
						<a className="navbar__menuLinks" onClick={handleLogout}>
							Logga ut
						</a>
					</div>
				</nav>
			</header>

			<header className="navbar__container-desktop">
				<section className="navbar__container-span">
					<div>
						<img src={Logo} className="navbar__logo" alt="Företagslogotyp" />
					</div>
					<div className="navbar__desktop-group">
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to="/allorders"
							onClick={toggleMenu}
						>
							Alla Beställningar
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to="/updatemenu"
							onClick={toggleMenu}
						>
							Uppdatera Menyn
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'navbar__desktop-links active-link-desktop'
									: 'navbar__desktop-links'
							}
							to="/stock"
							onClick={toggleMenu}
						>
							Lagerstatus
						</NavLink>
					</div>
					<a
						className="navbar__desktop-links button__logout"
						onClick={handleLogout}
					>
						Logga ut
					</a>
				</section>
			</header>
		</section>
	);
}

export { NavBarAdmin };
