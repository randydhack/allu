// CSS
import "./Home.scss";
import "../utils/DefaultStyles.scss";

// Images
import printingPress from "../../images/screen-printing.gif";
import gildan from "../../images/gildan.png";
import northface from "../../images/northface.png";
import carhartt from "../../images/logo-carhartt.png";
import american_apparel from "../../images/American_Apparel.png";
import champion from "../../images/champion.png";
import sport_tek from "../../images/Sport_Tek_Logo.png";
import hanes from "../../images/hanes.png";
import nike from "../../images/nike.png";
import corner_stone from "../../images/corner-stone.webp";

// Libaries
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// DATA
const images = [
  { url: sport_tek, alt: "sport tek logo" },
  { url: northface, alt: "north face logo" },
  { url: hanes, alt: "hanes logo" },
  { url: carhartt, alt: "carhartt logo" },
  { url: american_apparel, alt: "american apparel logo" },
  { url: gildan, alt: "gildan logo" },
  { url: champion, alt: "champion logo" },
  { url: nike, alt: "nike logo" },
  { url: corner_stone, alt: "corner stone logo" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-container">
      {/* Left Section */}
      <section className="home-left-container">
        <div className="main_home_content">
          <div className="home-left-heading">
            <h1>
              EXPERIENCE
              <br />
              WITH OUR DESIGNS
            </h1>
            <h2>
              Elevate your wardrobe with quality, comfort, and discover the joy
              of personalized fashion at ALL U
            </h2>
          </div>
          <div className="home-left-contents">
            <div className="home-btn-main">
              <button
                aria-label="designs"
                onClick={() => {
                  navigate("/designs");
                }}
                className="home-design-btn"
              >
                <span>Our Designs</span>
                <MdOutlineKeyboardArrowRight className="design-btn-arrow" />
              </button>
            </div>
            {/* <h1>
              Custom screenprinting, embroidery and more!
            </h1> */}
          </div>
        </div>
        <div
          className="gif-home"
          style={{
            backgroundImage: `url(${printingPress})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </section>

      <section className="section-2">
        <h2>Our Partners</h2>
        <div className="slider">
          <div className="slide-track">
            {images.map((el, i) => {
              return (
                <div key={i} className="slide">
                  <img src={el.url} alt={el.alt} width={150} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
