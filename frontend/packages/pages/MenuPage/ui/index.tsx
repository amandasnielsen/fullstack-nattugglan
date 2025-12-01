import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';
import { useEffect } from "react";
import { useMenuStore } from '../../../core/state/menuStore';

function MenuPage() {
	const menu = useMenuStore((state) => state.menu);
	const fetchMenu = useMenuStore((state) => state.fetchMenu);
  
	useEffect(() => {
	  fetchMenu();
	}, []);

	return (
		<>
			<NavBar />
			<Footer />
			<h1>Fuel the night!</h1>
			<ContentContainer>
			<div>
				{menu.map(item => (
				<div key={item.id}>{item.name}, {item.ingredients}, {item.price}</div>))}
			</div>
			</ContentContainer>
		</>
	);
}

export { MenuPage };
