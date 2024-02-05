// Libaries
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// Context
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";

// CSS
import "./Navbar.scss";

// Redux Store
import { getCart } from "../../store/BatchReducer";

// Icons
import { PiUserCircleThin } from "react-icons/pi";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

function Navbar() {
  const dispatch = useDispatch();

  const { toggleLogin, toggleSignUp } = useContext(ModalContext);
  const { user } = useContext(InfoContext);

  const currUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.batches.cart);
  const cartNull = cart.filter((el) => el["Batches.id"] != null);
  const [screenSmall, setScreenSmall] = useState(
    getWindowDimensions().width <= 768
  );
  const [mobile, setMobile] = useState(getWindowDimensions().width <= 425);
  const [toggleBurger, setToggleBurger] = useState(false);

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
        setScreenSmall(getWindowDimensions().width <= 768);
        setMobile(getWindowDimensions().width <= 425);

        if (screenSmall === false && mobile === false) {
          setToggleBurger(false);
        }
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [useWindowDimensions, setMobile, setToggleBurger]);

    return windowDimensions;
  }
  useWindowDimensions();

  return (
    <div className="nav__container">
      <div className="nav_inner_container">
        <div className="left-nav">
          <div className="nav_logo__container">
            {screenSmall ? (
              <div className="hamburger">
                {toggleBurger ? (
                  <button
                    aria-label="dropdown menu"
                    onClick={() => setToggleBurger(false)}
                  >
                    <RxCross1 />
                  </button>
                ) : (
                  <button
                    aria-label="dropdown menu"
                    onClick={() => setToggleBurger(true)}
                  >
                    <HiOutlineMenu />
                  </button>
                )}
                <NavLink to="/" aria-label="home" className="nav_logo-small">
                  ALL U
                </NavLink>
              </div>
            ) : (
              <NavLink to="/" aria-label="home" className="nav_logo">
                ALL U
              </NavLink>
            )}
          </div>

          {screenSmall ? (
            toggleBurger ? (
              <div
                className="dropdown-menu"
                style={{ height: `${mobile && "100vh"}` }}
              >
                <div className="drop-down-inner">
                  <NavLink to="/designs" alt="designs" aria-label="design">
                    DESIGNS
                  </NavLink>
                  <NavLink to="/about-us" alt="About Us" aria-label="about">
                    ABOUT US
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    alt="Contact Us"
                    aria-label="contact"
                  >
                    CONTACT US
                  </NavLink>
                  {mobile && (user || currUser) ? (
                    <div className="mobile-acc_cart">
                      <NavLink
                        to="/account-details"
                        aria-label="account"
                        className="mobile-account"
                      >
                        <PiUserCircleThin className="user-icon" />
                        <p className="mobile-icons">Account</p>
                      </NavLink>
                      <NavLink to="/checkout" aria-label="cart">
                        <div className="mobile-cart">
                          <PiShoppingCartSimpleThin className="cart-icon" />
                          <p>
                            Cart (
                            {cart?.length && cartNull.length ? cart.length : 0})
                          </p>
                        </div>
                      </NavLink>
                    </div>
                  ) : (
                    mobile && <div className="nav__right__section__mobile">
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
            ) : (
              ""
            )
          ) : (
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
        </div>

        {user || currUser
          ? !mobile && (
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
                  </div>
                </NavLink>
              </div>
            )
          : !mobile  && (
              <div className="nav__right__section">
                <NavLink
                  aria-label="sign in"
                  onClick={() => toggleLogin()}
                  className="sign-in account"
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
