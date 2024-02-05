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
];

function Home() {
  // const [currentImgIdx, setCurrentImg] = useState(
  //   // Math.floor(Math.random(images.length))
  //   0
  // );
  // function getWindowDimensions() {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height,
  //   };
  // }
  // const newHomeStyle = () => {
  // return getWindowDimensions().width < 1150
  //   ?

  // const backgroundStyle =
  // {
  //   backgroundImage: `url(${images[currentImgIdx].url})`,
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  //   backgroundPosition: "center center",
  // };

  // return backgroundStyle

  // : {};
  // }
  // const [homeStyle, setHomeStyle] = useState({
  //   backgroundImage: `url(${images[currentImgIdx].url})`,
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  //   backgroundPosition: "center center",
  // });

  // function useWindowDimensions() {
  //   const [windowDimensions, setWindowDimensions] = useState(
  //     getWindowDimensions()
  //   );

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //     setHomeStyle(newHomeStyle());
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // return windowDimensions;
  // }
  // useWindowDimensions();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentImg(currentImgIdx == images.length - 1 ? 0 : currentImgIdx + 1);
  //     // setHomeStyle({
  //     //   backgroundImage: `url(${images[currentImgIdx].url})`,
  //     //   backgroundRepeat: "no-repeat",
  //     //   backgroundSize: "cover",
  //     //   backgroundPosition: "center center",
  //     // });
  //   }, 10000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [currentImgIdx]);

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
        <div className="slider">
          <div className="slide-track">
            {images.map((el, i) => {
              return (
                <div class="slide">
                  <img key={i} src={el.url} alt={el.alt} width={150} />
                </div>
              );
            })}
          </div>
        </div>
          <h2>header</h2>
      </section>
    </main>
  );
}

export default Home;
