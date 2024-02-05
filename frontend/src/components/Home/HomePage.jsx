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
import Logo from "../../images/allu-high-res.png"

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
  console.log("reloaded")
  return (
    <main className="home-container">
      {/* Left Section */}
      <section className="home-left-container">
        <div className="main_home_content">
          <div className="home-left-heading">
            <img className="home-logo" src={Logo} alt="All U compay logo" />
            {/* <h1 className="business-name">
              All U inc.  
            </h1> */}
            {/* <h2>
              Elevate your wardrobe with quality, comfort, and discover the joy
              of personalized fashion at ALL U
            </h2> */}
            <h2 className="home-h2">Custom screenprinting, embroidery and more</h2>
            <h3 className="home-h3">"Making someone's favorite shirt" since 1986!</h3>
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
                <span>Explore customizable designs</span>
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
                <div className="slide" key={i}>
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
