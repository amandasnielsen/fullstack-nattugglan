import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@nattugglan/landingpage';
import { MenuPage } from '@nattugglan/menupage';
import { OrderPage } from '@nattugglan/orderpage';
import { MyOrdersPage } from '@nattugglan/myorderspage';
import { AboutUs } from '@nattugglan/aboutus';
import { MapPage } from '@nattugglan/mappage';
import { LoginPage } from '@nattugglan/loginpage';

function App() {
	return (
		<BrowserRouter>
			<section>
				<img className="forrest" src="./src/assets/BG-forrest-phone.png" />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/menu" element={<MenuPage />} />
					<Route path="/orderstatus" element={<OrderPage />} />
					<Route path="/myorders" element={<MyOrdersPage />} />
					<Route path="/aboutUs" element={<AboutUs />} />
					<Route path="/maps" element={<MapPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</section>
		</BrowserRouter>
	);
}

export default App;
