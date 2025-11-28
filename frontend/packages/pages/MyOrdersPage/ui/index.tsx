import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function MyOrdersPage() {
	return (
		<>
			<NavBar />
			<Footer />
			<h1>Tidigare Beställningar</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	)
}

export { MyOrdersPage };
