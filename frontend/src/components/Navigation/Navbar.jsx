// Libaries
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Context
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";

// Logo
import Logo from "../../images/allu-high-res.png";

// CSS
import "./Navbar.scss";

// Icons
import { PiUserCircle } from "react-icons/pi";

import { IoCartOutline } from "react-icons/io5";

function Navbar() {
  const { toggleLogin, toggleSignUp } = useContext(ModalContext);
  const { user } = useContext(InfoContext);

  const currUser = useSelector((state) => state.session.user);

  return (
    <div className="nav__container">
      <div className="nav_inner_container">
        <div className="left-nav">
          <div className="nav_logo__container">
            <NavLink to="/">
              <img
                className="nav_logo"
                src={Logo}
                alt="all-u logo, click to return to home page"
              />
            </NavLink>
          </div>

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
          </div>
        </div>

        {user || currUser ? (
          <div className="nav__profile__cart">
            <NavLink to="/account-details">
              <PiUserCircle className="user-icon" />
            </NavLink>
            <NavLink to="/checkout">
              <div className="cart-container">
                <IoCartOutline className="cart-icon" />
                <div className="cart_total_items">0</div>
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="nav__right__section">
            <button onClick={() => toggleLogin()}>Sign in</button>
            <button onClick={() => toggleSignUp()}>Register</button>
            {/* <NavLink to="/checkout">
              <IoCartOutline className="nav-icon " />
            </NavLink> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
