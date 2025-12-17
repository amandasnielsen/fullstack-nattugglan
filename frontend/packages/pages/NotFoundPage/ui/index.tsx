import "./index.css";
import { NavBar } from "@nattugglan/navbar";
import { Footer } from "@nattugglan/footer";
import ConfusedOwlGif from "./assets/confused-owl.gif";
import { Button } from "@nattugglan/button";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <>
      <NavBar />

      <main className="notfound">
        <img
          src={ConfusedOwlGif}
          alt="Förvirrad uggla som inte hittar sidan"
          className="notfound__image"
        />

        <h1 className="notfound__title">Hoppsan! Sidan hittades inte.</h1>
        <p className="notfound__text">
          Antingen har du flugit fel, eller så finns inte sidan längre.
        </p>

				<div className="button__checkout-wrapper">
					<Button
						variant="secondary"
						fullWidth={true}
						onClick={goHome}
						className="button__checkout"
					>
						Till startsidan
					</Button>
				</div>
      </main>

      <Footer />
    </>
  );
}

export { NotFoundPage };
