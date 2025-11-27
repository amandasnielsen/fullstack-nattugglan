import './index.css';
import Logo from './assets/logo.png';

function LandingPage() {
  return (
    <section className="landingpage">
      
      <div className="landing__content">
        <h1>Vaken? Vi med!</h1>
				<img className="logo__landing" src={Logo} alt="nattugglan logo" />
      </div>

    </section>
  )
}

export { LandingPage }