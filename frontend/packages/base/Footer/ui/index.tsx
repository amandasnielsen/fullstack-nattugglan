import './index.css';
import FacebookIcon from './assets/facebook-icon.svg';
import InstagramIcon from './assets/instagram-icon.svg';
import MapIcon from './assets/map-icon.svg';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<section>
			
			<section className="footer__container-phone">	
				<div className="footer__content">
					<span className="footer__span">
						<p className="footer__contact">Frågor? Ring!<br/>070 - 123 45 67</p>
						<p className="footer__hours">Öppettider<br/>23 - 07</p>
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

			<section className="footer__container-desktop">
				<div className="footer__span-desktop">
					<div className="footer__content-left">
						<div className="footer__info">
							<div className="footer__info-box">
								<h4>Adress</h4>
								<p>Lingonstigen 19<br/>Jokkmokk</p>
							</div>
							<div className="footer__info-box">
								<h4>Kontakt</h4>
								<p>070 - 123 45 67<br/><a className="footer__mail" href="mailto:nattugglan@gmail.com">nattugglan@gmail.com</a></p>
							</div>
							<div className="footer__info-box">
								<h4>Öppettider</h4>
								<p>Alla dagar 23 - 07</p>
							</div>
						</div>
					</div>
					<div className="footer__content-right">
						<div className="footer__media-desktop">
								<img src={FacebookIcon} alt="facebook icon" />
								<img src={InstagramIcon} alt="instagram icon" />
								<Link to="/maps" className="icon__link">
									<img className="icon__map" src={MapIcon} alt="karta icon" />
								</Link>
							</div>
					</div>
				</div>
			</section>

		</section>
	)
}

export { Footer }