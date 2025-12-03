import "./index.css";
import { NavBar } from "@nattugglan/navbar";
import { Footer } from "@nattugglan/footer";
import { ContentContainer } from "@nattugglan/contentcontainer";


const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d792.1505001233404!2d19.801145354504925!3d66.60386375794627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45d7b731718258f9%3A0xfedb8d6e87f34ccf!2sLingonstigen%2019%2C%20962%2033%20Jokkmokk!5e0!3m2!1ssv!2sse!4v1764759967267!5m2!1ssv!2sse";

function MapPage() {
  return (
    <>
      <NavBar />

      <main className="map">
        <h1 className="map__title">Vart finns vi?</h1>

        <ContentContainer className="map__card">
          <article className="map__content">
            <h2 className="map__heading">Adress</h2>

            <div className="map__iframe-wrapper">
              <iframe
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map__iframe"
                title="Karta som visar var Nattugglan ligger i Jokkmokk"
                allowFullScreen
              />
            </div>

            <p className="map__text">
              Lingonstigen 19,
              <br />
              962 31 Jokkmokk
            </p>

            <p className="map__text">
              Ring gärna!
              <br />
              070&nbsp;-&nbsp;123&nbsp;45&nbsp;67
            </p>

            <p className="map__text">
              Mejl:
              <br />
              <a href="mailto:nattugglan@gmail.com">nattugglan@gmail.com</a>
            </p>
          </article>
        </ContentContainer>

        <Footer />
      </main>
    </>
  );
}

export { MapPage };
