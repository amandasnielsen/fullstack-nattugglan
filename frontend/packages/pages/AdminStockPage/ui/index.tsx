import './index.css';
import { NavBarAdmin } from '@nattugglan/navbaradmin';
import { FooterAdmin } from '@nattugglan/footeradmin';
import { ContentContainer } from '@nattugglan/contentcontainer';

function StockPage() {
	return (
		<>
			<NavBarAdmin />
			<FooterAdmin />
			<h1>Lagerstatus</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	)
}

export {StockPage};
