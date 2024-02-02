// Libaries
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// Context
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";

// Logo
import Logo from "../../images/allu-high-res.png";

// CSS
import "./Navbar.scss";

// Redux Store
import { getCart } from "../../store/BatchReducer";

// Icons
import { PiUserCircle } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";

function Navbar() {

  const dispatch = useDispatch()

  const { toggleLogin, toggleSignUp } = useContext(ModalContext);
  const { user } = useContext(InfoContext);

  const currUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.batches.cart);
  const [screenSmall, setScreenSmall]=useState(getWindowDimensions().width<700)

  useEffect(() => {
    if (currUser){
      dispatch(getCart())
    }
  }, [dispatch, currUser])

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
        setScreenSmall(getWindowDimensions().width<700)
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }
  useWindowDimensions()

  return (
    <div className="nav__container">
      <div className="nav_inner_container">
        <div className="left-nav">
              {screenSmall&&
              <>
                <input id="toggle1" type="checkbox" />
                <label className="hamburger1" htmlFor="toggle1">
                  <div className="top"></div>
                  <div className="middle"></div>
                  <div className="bottom"></div>
                </label>
                <nav class="menu1">
                <NavLink to="/designs" alt="designs" className="link1">
                  Designs
                </NavLink>
                <NavLink to="/contact-us" alt="Contact Us" className="link1">
                  Contact Us
                </NavLink>
                <NavLink to="/about-us" alt="About Us" className="link1">
                  About us
                </NavLink>
                </nav>
              </>
              }
          <div className="nav_logo__container">
            <NavLink to="/">
              <img
                className="nav_logo"
                src={Logo}
                alt="all-u logo, click to return to home page"
              />
            </NavLink>
          </div>

          {!screenSmall&&
          <div className="nav__middle__section">
            <NavLink to="/designs" alt="designs">
              Designs
            </NavLink>
            <NavLink to="/contact-us" alt="Contact Us">
              Contact Us
            </NavLink>
            <NavLink to="/about-us" alt="About Us">
              About us
            </NavLink>
          </div>}
          {screenSmall&&
          <>

          </>
          }
        </div>

        {user || currUser ? (
          <div className="nav__profile__cart">
            <NavLink to="/account-details">
              <PiUserCircle className="user-icon" />
            </NavLink>
            <NavLink to="/checkout">
              <div className="cart-container">
                <IoCartOutline className="cart-icon" />
                {cart?.length ? (
                  <div className="cart_total_items">{cart?.length}</div>
                ) : (
                  ""
                )}
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="nav__right__section">
            <button onClick={() => toggleLogin()}>Sign in</button>
            <button onClick={() => toggleSignUp()}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
