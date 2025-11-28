import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function OrderPage() {
	return (
		<>
			<NavBar />
			<Footer />
			<h1>Min Beställning</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	)
}

export { OrderPage };
