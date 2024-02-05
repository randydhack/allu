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
import { PiUserCircleThin } from "react-icons/pi";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

function Navbar() {
  const dispatch = useDispatch();

  const { toggleLogin, toggleSignUp } = useContext(ModalContext);
  const { user } = useContext(InfoContext);

  const currUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.batches.cart);
  const cartNull = cart.filter((el) => el["Batches.id"] != null);
  const [screenSmall, setScreenSmall] = useState(
    getWindowDimensions().width < 700
  );

  useEffect(() => {
    if (currUser) {
      dispatch(getCart());
    }
  }, [dispatch, currUser]);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
        setScreenSmall(getWindowDimensions().width < 700);
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  useWindowDimensions();

  return (
    <div className="nav__container">
      <div className="nav_inner_container">
        <div className="left-nav">
          {screenSmall && (
            <>
              <input id="toggle1" type="checkbox" aria-label="hamburger" />
              <label className="hamburger1" htmlFor="toggle1">
                <div className="top"></div>
                <div className="middle"></div>
                <div className="bottom"></div>
              </label>
              <nav className="menu1">
                <NavLink to="/designs" alt="designs" aria-label="design">
                  DESIGNS
                </NavLink>
                <NavLink to="/about-us" alt="About Us" aria-label="about">
                  ABOUT US
                </NavLink>
                <NavLink to="/contact-us" alt="Contact Us" aria-label="contact">
                  CONTACT US
                </NavLink>
              </nav>
            </>
          )}
          <div className="nav_logo__container">
            <NavLink to="/" aria-label="home" className="nav_logo">
              {/* <img
                className="nav_logo"
                src={Logo}
                alt="all-u logo, click to return to home page"
              /> */}
              ALL U
            </NavLink>
          </div>

          {!screenSmall && (
            <div className="nav__middle__section">
              <NavLink to="/designs" alt="designs" aria-label="design">
                DESIGNS
              </NavLink>
              <NavLink to="/about-us" alt="About Us" aria-label="about">
                ABOUT US
              </NavLink>
              <NavLink to="/contact-us" alt="Contact Us" aria-label="contact">
                CONTACT US
              </NavLink>
            </div>
          )}
          {screenSmall && <></>}
        </div>

        {user || currUser ? (
          <div className="nav__profile__cart">
            <NavLink
              to="/account-details"
              aria-label="account"
              className="account"
            >
              <PiUserCircleThin className="user-icon" />
              <p>Account</p>
            </NavLink>
            <NavLink to="/checkout" aria-label="cart">
              <div className="cart-container">
                <PiShoppingCartSimpleThin className="cart-icon" />
                <p>
                Cart ({cart?.length && cartNull.length ? cart.length : 0})
                </p>
                {/* {cart?.length && cartNull.length ? (
                  <div className="cart_total_items">{cart?.length}</div>
                ) : (
                  ""
                )} */}
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="nav__right__section">
            <NavLink
              aria-label="sign in"
              onClick={() => toggleLogin()}
              className="sign-in"
            >
              <PiUserCircleThin className="user-icon" />
              <p>Sign In</p>
            </NavLink>
            <button
              className="register"
              aria-label="sign up"
              onClick={() => toggleSignUp()}
            >
              <p className="register">Register</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
