import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@nattugglan/landingpage';
import { MenuPage } from '@nattugglan/menupage';
import { OrderStatusPage } from '@nattugglan/orderstatuspage';
import { MyOrdersPage } from '@nattugglan/myorderspage';
import { AboutUs } from '@nattugglan/aboutus';
import { MapPage } from '@nattugglan/mappage';
import { LoginPage } from '@nattugglan/loginpage';
import { AdminChangeMenuPage } from '@nattugglan/adminchangemenupage';
import { StockPage } from '@nattugglan/stockpage';
import { AdminAllOrdersPage } from '@nattugglan/adminallorderspage';
import { PaymentPage } from '@nattugglan/paymentpage';
import { OrderConfirmationPage } from '@nattugglan/orderconfirmationpage';
import { CartPage } from '@nattugglan/cartpage';
import ForrestBackground from './assets/BG-forrest.jpg';

function App() {
	return (
		<BrowserRouter>
			<section>
				<img className="forrest" src={ForrestBackground} alt="Skogsbakgrund" />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/menu" element={<MenuPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/payment" element={<PaymentPage />} />
					<Route path="/orderstatus/:orderNumber" element={<OrderStatusPage />} />
					<Route path="/myorders" element={<MyOrdersPage />} />
					<Route path="/aboutUs" element={<AboutUs />} />
					<Route path="/maps" element={<MapPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/allorders" element={<AdminAllOrdersPage />} />
					<Route path="/updatemenu" element={<AdminChangeMenuPage />} />
					<Route path="/stock" element={<StockPage />} />
					<Route path="/payment" element={<PaymentPage />} />
					<Route path="/order/:orderNumber" element={<OrderConfirmationPage />}
					/>
				</Routes>
			</section>
		</BrowserRouter>
	);
}

export default App;
