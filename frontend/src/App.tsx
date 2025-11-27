import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@nattugglan/landingpage';
//import { Footer } from '@nattugglan/footer'; > lägg till på de sidor som ska ha footer


function App() {
	return (
		<BrowserRouter>
			<section>
				<img className="forrest" src="./src/assets/BG-forrest-phone.png" />
				<Routes>
					<Route path="/" element={<LandingPage />} />
				</Routes>
			</section>
    </BrowserRouter>
	);
}

export default App;