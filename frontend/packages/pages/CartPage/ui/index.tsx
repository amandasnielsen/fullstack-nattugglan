import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function CartPage() {
	return (
		<>
			<NavBar />
			<Footer />
			<h1>Varukorg</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	)
}

export default CartPage;
