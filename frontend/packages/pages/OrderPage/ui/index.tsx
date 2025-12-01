import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useParams } from 'react-router-dom';

function OrderPage() {
	const { orderNumber } = useParams<{ orderNumber: string }>();

	return (
		<>
			<NavBar />
			<Footer />
			<h1>Min Beställning</h1>
			<ContentContainer>
				<p>{orderNumber}</p>
			</ContentContainer>
		</>
	);
}

export { OrderPage };
