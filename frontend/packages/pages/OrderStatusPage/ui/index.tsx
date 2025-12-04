import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function OrderStatusPage() {
	return (
		<>
			<NavBar />
			<Footer />
			<h1>Orderstatus</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	);
}

export { OrderStatusPage };
