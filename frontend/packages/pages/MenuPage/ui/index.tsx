import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function MenuPage() {
	return (
		<>
			<NavBar />
			<Footer />
			<h1>Fuel the night!</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	);
}

export { MenuPage };
