import './index.css';
import { NavBar } from '@nattugglan/navbar';
import { Footer } from '@nattugglan/footer';
import { ContentContainer } from '@nattugglan/contentcontainer';

function AboutUs() {
	return (
		<>
			<NavBar />
			<Footer />
			<h1>Om oss</h1>
			<ContentContainer>
				<p>Text</p>
			</ContentContainer>
		</>
	)
}

export { AboutUs };