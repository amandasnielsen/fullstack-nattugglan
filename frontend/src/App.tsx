import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@nattugglan/landingpage';
import { MenuPage } from '@nattugglan/menupage';
import { OrderFlowPage } from '@nattugglan/orderflowpage';
import { MyOrdersPage } from '@nattugglan/myorderspage';
import { AboutUs } from '@nattugglan/aboutus';
import { MapPage } from '@nattugglan/mappage';
import { LoginPage } from '@nattugglan/loginpage';
import { ChangeOrdersPage } from '@nattugglan/adminchangeorderspage';
import { StockPage } from '@nattugglan/stockpage';
import { AdminAllOrdersPage } from '@nattugglan/adminallorderspage';
import { PaymentPage } from '@nattugglan/paymentpage';
import { OrderPage } from '@nattugglan/orderpage';
import { CartPage } from '@nattugglan/cartpage';

function App() {
	return (
		<BrowserRouter>
			<section>
				{/*<img className="forrest" src="./src/assets/BG-forrest-phone.png" />*/}
				<img className="forrest" src="./src/assets/BG-forrest-new.jpg" />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/menu" element={<MenuPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/payment" element={<PaymentPage />} />
					<Route path="/orderstatus" element={<OrderFlowPage />} />
					<Route path="/myorders" element={<MyOrdersPage />} />
					<Route path="/aboutUs" element={<AboutUs />} />
					<Route path="/maps" element={<MapPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/allorders" element={<AdminAllOrdersPage />} />
					<Route path="/updatemenu" element={<ChangeOrdersPage />} />
					<Route path="/stock" element={<StockPage />} />
					<Route path="/payment" element={<PaymentPage />} />
					<Route path="/order/:orderNumber" element={<OrderPage />} />
				</Routes>
			</section>
		</BrowserRouter>
	);
}

export default App;
