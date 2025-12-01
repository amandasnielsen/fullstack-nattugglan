import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function PaymentPage() {
	return (
		<>
			<NavBar />
			<Footer />
			<h1>Betala</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	)
}

export default PaymentPage;
