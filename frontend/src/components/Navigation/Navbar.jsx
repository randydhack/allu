// Libaries
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Context
import { ModalContext } from "../../context/modalContext";

// Components
import LoginModal from "../Modals/LoginModal";
import SignUpModal from "../Modals/SignUpModal";

// CSS
import "./Navbar.scss";

// Icons
import { CiUser } from "react-icons/ci";


function Navbar() {
  const { toggleLogin, toggleSignUp } = useContext(ModalContext);

  const user = useSelector((state) => state.session.user);

  console.log(user);

  return (
    <div className="nav__container">
      <NavLink to="/">
        <img
          className="nav_logo"
          src="t_shirt_logo.png"
          alt="all-u logo, click to return to home page"
        />
      </NavLink>

      <div className="nav__middle__section">
        <NavLink to="/our-designs">Our Designs</NavLink>
        <NavLink>Create your own designs</NavLink>
        <NavLink>About us</NavLink>
      </div>

      {user ? (
        <div className="nav__profile__cart">
          <NavLink to='/account-details'>
            <CiUser className="profile__icon"/> <span>My Account</span>
          </NavLink>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      ) : (
        <div className="nav__right__section">
          <button onClick={() => toggleLogin()}>Sign in</button>
          <button onClick={() => toggleSignUp()}>Register</button>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      )}
    </div>
  );
}

export default Navbar;
