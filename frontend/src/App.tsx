import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@nattugglan/landingpage';


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