import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function ChangeOrdersPage() {
	return (
		<>
			<NavBarAdmin />
			<Footer />
			<h1>Ändra menyn</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	)
}

export { ChangeOrdersPage };
