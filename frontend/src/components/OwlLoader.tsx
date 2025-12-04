import React from "react";
import OwlLoaderGif from "../assets/owl-loader.gif";
import ForestBg from "../assets/BG-forrest-phone.png";
import "./OwlLoader.css";

function OwlLoader() {
  return (
    <div className="owl-loader">
      {/* Samma bakgrund som resten */}
      <img
        src={ForestBg}
        alt=""
        aria-hidden="true"
        className="owl-loader__bg"
      />

      {/* Ugglan i mitten */}
      <img
        src={OwlLoaderGif}
        alt="Nattugglan som flaxar med vingarna"
        className="owl-loader__image"
      />
    </div>
  );
}

export { OwlLoader };
