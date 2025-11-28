import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function AdminAllOrdersPage() {
	return (
		<>
				<NavBar />
				<Footer />
				<h1>Alla beställningar</h1>
				<ContentContainer>
					<p>Text</p>
				</ContentContainer>
		</>
	)
}

export {AdminAllOrdersPage};
