import "./index.css";
import OwlLoaderGif from "./assets/owl-loader.gif";

function LoadingPage() {
  return (
    <main className="loading">
      <img
        src={OwlLoaderGif}
        alt="Nattugglan som laddar sidan"
        className="loading__image"
      />

      <h1 className="loading__title">Laddar…</h1>
      <p className="loading__text">
        Håll ut en liten stund, nattmaten är på väg.
      </p>
    </main>
  );
}

export { LoadingPage };
