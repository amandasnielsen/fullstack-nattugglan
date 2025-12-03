import "./index.css";
import { NavBar } from "@nattugglan/navbar";
import { Footer } from "@nattugglan/footer";
import { Button } from "@nattugglan/button";

function LoginPage() {
  return (
    <>
      <NavBar />

      <main className="login">
        <h1 className="login__title">Admin</h1>

        <section className="login__container">
          <div className="login__form">
            <label className="login__label" htmlFor="username">
              Användarnamn
            </label>
            <input
              id="username"
              type="text"
              className="login__input"
            />

            <label className="login__label" htmlFor="password">
              Lösenord
            </label>
            <input
              id="password"
              type="password"
              className="login__input"
            />

            <Button
              variant="primary"
              fullWidth={true}
              className="landing__button-login login__button"
            >
              Logga in
            </Button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export { LoginPage };
