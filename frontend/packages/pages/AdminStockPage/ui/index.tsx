import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function StockPage() {
	return (
		<>
			<NavBar />
			<Footer />
			<h1>Lagerstatus</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	)
}

export {StockPage};
