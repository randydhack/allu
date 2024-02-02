// CSS
import "./Home.scss";
import "../utils/DefaultStyles.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import printingPress from '../../images/screen-printing.gif'
import model from '../../images/model-with-books.png'
import padPrinting from '../../images/pad-printing.gif'
import manualPress from '../../images/manual-press.jpg'
import { ModalContext } from "../../context/modalContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../images/allu-high-res.png'

function Home() {
  const currUser = useSelector((state) => state.session.user);
  const { toggleSignUp } = useContext(ModalContext);
  const navigate = useNavigate()
  const images=[
    {url:printingPress, alt:"screenprinting press in operation"},
    {url: model, alt: "model wearing screenprinted shirt"},
    {url: padPrinting, alt: "pad printing machine in operation"},
    {url: manualPress, alt:"manual screen printing press"}
  ]
  const [currentImgIdx, setCurrentImg] = useState(Math.floor(Math.random(images.length)))
  useEffect(()=>{
    const intervalId = setInterval(()=>{
      setCurrentImg(currentImgIdx==images.length-1?0:currentImgIdx+1)      
    }, 15000)
    return ()=>{clearInterval(intervalId)}
  }, [currentImgIdx])
  

  return (
    <div className="home-container">
      {/* Left Section */}
      <div className="home-left-container">
        <div className="home-left-heading">
          <img src={Logo} alt="All-U logo" />
          <h1>CUSTOM APPAREL</h1>
          <h3>Your one stop shop for custom screenprinting, embroidery and more!</h3>
        </div>

        <div className="home-left-contents">
          <div className="home-left-infos">
            <div className={currUser?"solocolumn":"subcolumn"}>
              <p>Order shirts or hoodies with one of our pre-built designs!</p>
              <button onClick={()=>{navigate('/designs')}} className="home-left-buttons">
                Browse designs
              </button>
            </div>
            {!currUser&&
            <div className="subcolumn">
              <p>Sign up to track your orders and save custom designs</p>
              <button onClick={toggleSignUp} className="home-left-buttons">Sign Up!</button>
            </div>}
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

      {/* Right Section */}
      <div className="home-right-container">
        <img className="splash-img" src={images[currentImgIdx].url} alt={images[currentImgIdx].alt} />
      </div>
    </div>
  );
}

export default Home;
