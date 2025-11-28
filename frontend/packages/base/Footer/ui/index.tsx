import './index.css';
import FacebookIcon from './assets/facebook-icon.svg';
import InstagramIcon from './assets/instagram-icon.svg';
import MapIcon from './assets/map-icon.svg';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<section className="footer__container">
			
			<div className="footer__content">
				<span className="footer__span">
					<p className="footer__contact">Frågor? Ring gärna!<br/>070 - 123 45 67</p>
					<div className="footer__media">
						<img src={FacebookIcon} alt="facebook icon" />
						<img src={InstagramIcon} alt="instagram icon" />
						<Link to="/maps" className="icon__link">
							<img className="icon__map" src={MapIcon} alt="karta icon" />
						</Link>
					</div>
				</span>
			</div>

		</section>
	)
}

export { Footer }