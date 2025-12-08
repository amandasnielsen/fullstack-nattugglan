import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function AdminAllOrdersPage() {
	return (
		<>
				<NavBarAdmin />
				<Footer />
				<h1>Alla beställningar</h1>
				<ContentContainer>
					<p>Text</p>
				</ContentContainer>
		</>
	)
}

export {AdminAllOrdersPage};
