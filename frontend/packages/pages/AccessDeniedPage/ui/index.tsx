import "./index.css";
import { NavBar } from "@nattugglan/navbar";
import { Button } from "@nattugglan/button";
import { useNavigate } from 'react-router-dom';

function AccessDenied() {

	const navigate = useNavigate();

	const goToMenu = () => {
		navigate('/menu');
	}

  return (
    <>
      <NavBar />
      <main className="access__denied">
        <h2 className="access__denied-title">Åtkomst Nekad</h2>
				<div className="button__checkout-wrapper">
					<Button 
						variant="secondary" 
						fullWidth={true}  
						onClick={goToMenu}
						className="button__checkout" 
					>
						Till menyn
					</Button>
				</div>
      </main>

    </>
  );
}

export { AccessDenied };
