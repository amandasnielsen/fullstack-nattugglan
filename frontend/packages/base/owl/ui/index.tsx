import "./index.css";
import OwlLoaderGif from "./assets/owl-loader.gif";
import ForestBg from "../../../../src/assets/BG-forrest.png";

function OwlLoader() {
  return (
    <div className="owl-loader">
      {/* bakgrundsbild */}
      <img
        src={ForestBg}
        alt=""
        aria-hidden="true"
        className="owl-loader__bg"
      />

      {/* ugglan i mitten */}
      <img
        src={OwlLoaderGif}
        alt="Nattugglan som flaxar med vingarna"
        className="owl-loader__image"
      />
    </div>
  );
}

export { OwlLoader };
