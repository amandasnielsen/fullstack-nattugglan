import "./index.css";
import { NavBar } from "@nattugglan/navbar";
import { Footer } from "@nattugglan/footer";
import { ContentContainer } from "@nattugglan/contentcontainer";

import NorthernLight from "./assets/northern-light.png";
import TakeawayBag from "./assets/takeaway-bag.png";

function AboutUs() {
  return (
    <>
      <NavBar />

      <main className="aboutus">
        <h1 className="aboutus__title">Om oss</h1>

        <ContentContainer className="aboutus__card">
          <article className="aboutus__content">
            <h2 className="aboutus__heading">Vaken? Vi med!</h2>

            <p className="aboutus__intro">
              Glöm dygnsrytmen, omfamna mörkret!
            </p>

            <p>
              I Jokkmokk, där midnattssolen dragit sig tillbaka och nätterna är
              som allra mysigast, hittar du oss: <strong>Nattugglan</strong>.
            </p>

            <p>
              Vi är en liten nattöppen take away som serverar vilt och
              skogsinspirerad mat – rykande wraps, burgare och varma rätter med
              smaker från fjäll, skog och eld.
            </p>

            <img
              src={NorthernLight}
              alt="Norrsken över fjäll och Nattugglans stuga"
              className="aboutus__image"
            />

            <p>
              Hit kommer nattvandrare, skoteråkare, skiftarbetare och alla som
              bara vägrar gå och lägga sig. Vi tror att de bästa samtalen och
              de knäppaste idéerna händer efter midnatt – gärna med något varmt
              i händerna.
            </p>

            <p>
              Oavsett om du är på väg hem, vidare ut i natten eller bara vill
              ta en paus i mörkret, finns vi här med mat, kaffe och lite extra
              värme.
            </p>

            <img
              src={TakeawayBag}
              alt="Take away-påse och kaffe från Nattugglan"
              className="aboutus__image"
            />

            <section className="aboutus__values">
              <h3 className="aboutus__values-title">Våra värderingar</h3>

              <ul className="aboutus__values-list">
                <li>
                  <strong>Nära naturen.</strong> Vi använder så mycket lokala
                  råvaror vi kan – vilt, bär, svamp och smaker från skogen runt
                  Jokkmokk.
                </li>
                <li>
                  <strong>Respekt för djur & mark.</strong> Vi planerar menyn
                  efter säsong och samarbetar med leverantörer som tar hållbar
                  jakt och fiske på allvar.
                </li>
                <li>
                  <strong>Varmt bemötande i kallt klimat.</strong> Alla ska
                  känna sig välkomna hos oss, oavsett om du bara vill ha en
                  kaffe eller fylla hela ryggsäcken med mat.
                </li>
                <li>
                  <strong>Mat för nattugglor.</strong> Vi lagar mat som orkar
                  följa med på sena samtal, långa resor och spontana äventyr.
                </li>
              </ul>
            </section>
          </article>
        </ContentContainer>

        <Footer />
      </main>
    </>
  );
}

export { AboutUs };
