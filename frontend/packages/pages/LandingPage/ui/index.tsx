import './index.css';
import Logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nattugglan/button';


function LandingPage() {

	const navigate = useNavigate();

	const goToMenu = () => {
		navigate('/menu');
	}

	const goToLogin = () => {
		navigate('/login');
	}

  return (
    <section className="landingpage">
      
      <div className="landing__content">
        <h1 className="landing__header">Vaken? Vi med!</h1>
				<img className="logo__landing" src={Logo} alt="nattugglan logo" />

				<div className="button__group">
          <Button 
            variant="secondary" 
            fullWidth={true}  
            onClick={goToMenu}
						className="landing__button-menu" 
          >
            Beställ käk!
          </Button>

          <Button
            variant="primary" 
            fullWidth={true} 
            onClick={goToLogin} 
						className="landing__button-login" 
          >
            Admin
          </Button>
        </div>
      </div>

    </section>
  )
}

export { LandingPage }