import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { Button } from '@nattugglan/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@nattugglan/core/state/authStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const authLogin = useAuthStore((state) => state.login);

	async function handleLogin() {
		try {
			const res = await fetch(`${BASE_URL}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': 'yourapikey',
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || 'Login failed');
				return;
			}
			setError('');

			const token = data.token;
			const role = data.role as 'admin' | 'user';

			authLogin(token, role);

			if (role === 'admin') {
				navigate('/allorders');
			} else {
				navigate('/menu');
			}
		} catch (err) {
			console.error(err);
			setError('Something went wrong');
		}
	}

	return (
		<>
			<NavBar />

			<main className="login">
				<h1 className="login__title">Admin</h1>

				<section className="login__container">
					<div className="login__form">
						<label className="login__label" htmlFor="username">
							Användarnamn
						</label>
						<input
							id="username"
							type="text"
							className="login__input"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

						<label className="login__label" htmlFor="password">
							Lösenord
						</label>
						<input
							id="password"
							type="password"
							className="login__input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && <p className="error__message">{error}</p>}

						<Button
							variant="primary"
							fullWidth={true}
							className="landing__button-login login__button"
							onClick={handleLogin}
						>
							Logga in
						</Button>
					</div>
				</section>

				<Footer />
			</main>
		</>
	);
}

export { LoginPage };
