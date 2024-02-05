// CSS
import "./Home.scss";
import "../utils/DefaultStyles.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import printingPress from "../../images/screen-printing.gif";
import model from "../../images/model-with-books.png";
import padPrinting from "../../images/pad-printing.gif";
import manualPress from "../../images/manual-press.jpg";
import { ModalContext } from "../../context/modalContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/allu-high-res.png";

function Home() {
  const images = [
    { url: printingPress, alt: "screenprinting press in operation" },
    { url: model, alt: "model wearing screenprinted shirt" },
    { url: padPrinting, alt: "pad printing machine in operation" },
    { url: manualPress, alt: "manual screen printing press" },
  ];
  const [currentImgIdx, setCurrentImg] = useState(
    // Math.floor(Math.random(images.length))
    0
  );
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
  const [homeStyle, setHomeStyle] = useState({
    backgroundImage: `url(${images[currentImgIdx].url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  });

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
  const currUser = useSelector((state) => state.session.user);
  const { toggleSignUp } = useContext(ModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImg(currentImgIdx == images.length - 1 ? 0 : currentImgIdx + 1);
      // setHomeStyle({
      //   backgroundImage: `url(${images[currentImgIdx].url})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center center",
      // });
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentImgIdx]);

  return (
    <div className="home-container">
      {/* Left Section */}
      <div className="home-left-container">
        <img
          className="splash-img"
          src={images[currentImgIdx].url}
          alt={images[currentImgIdx].alt}
        />
        <div className="main_home_content">
          <div className="home-left-heading">
            {/* <img src={Logo} alt="All-U logo" width={500}/> */}
            <div className="header_logo">
            <img
                src={Logo}
                alt="all-u logo, click to return to home page"
                />
                </div>
                <br></br>
                <br></br>
                <br></br>
            <h1>
              Custom screenprinting, embroidery and more!
            </h1>
          </div>
          <br></br>
          <br></br>
          <div className="home-left-contents">
            <div className="home-left-infos">
              <div className={currUser ? "solocolumn" : "subcolumn"}>
                <button
                  aria-label="designs"
                  onClick={() => {
                    navigate("/designs");
                  }}
                  className="home-left-buttons"
                >
                  Catalogue
                </button>
              </div>
              {!currUser && (
                <div className="subcolumn">
                  {/* <p>Sign up to track your orders and save custom designs</p> */}
                  <button
                    aria-label="sign up"
                    onClick={toggleSignUp}
                    className="home-left-buttons"
                    >
                    Sign Up!
                  </button>
                </div>
              )}
            </div>
                    <h2>
                    Welcome to ALL U – where style meets self-expression! Explore our curated collection of custom-printed T-shirts and hoodies, designed to showcase your unique personality. Elevate your wardrobe with quality, comfort, and a touch of individuality. Discover the joy of personalized fashion at ALL U today!
                    </h2>
          </div>

          {/* <span className="divider">
            <span className="border-t-[1px] border-solid border-white flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
            <span className="px-[10px]">or</span>
            <span className="border-t-[1px] border-solid border-white flex-auto min-w-[1px] pt-[8px] mt-[8px]"></span>
          </span>
          <div className="subcolumn bottom">
            <button className="home-left-buttons bottom-button">
                  Upload Your Own Design
            </button>
          </div> */}
        </div>
      </div>

      {/* Right Section
      <div className="home-right-container">
      </div> */}
    </div>
  );
}

export default Home;
