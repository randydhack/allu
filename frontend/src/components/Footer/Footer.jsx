// Libaries
import { NavLink } from 'react-router-dom'
import {useState, useEffect}from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
// CSS
import "./Footer.scss";
// Redux Store
import { logoutUser } from "../../store/session";

import { InfoContext } from "../../context/infoContext";
import { ModalContext } from "../../context/modalContext";

function Footer() {
  const { setUser } = useContext(InfoContext)
  const {toggleLogin, toggleSignUp} = useContext(ModalContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currUser = useSelector((state) => state.session.user);
  const [screenSmall, setScreenSmall]=useState(getWindowDimensions().width<700)
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height};
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
  const handleUserLogout = async (e) => {
    e.preventDefault()
    await dispatch(logoutUser())
    setUser(null)
    return navigate('/')
  }
  return (
    <div className="footer">
      <div className="footer__main">
        <div className='footer__section'>
          <h4 className="footer-header">Showroom Hours</h4>
          <div className="showroom__schedule">
            <div>
             {!screenSmall&&
             <>
             <p>Mon:  8:30am - 4:30pm</p>
              <p>Tue:  8:30am - 4:30pm</p>
              <p>Wed:  8:30am - 4:30pm</p>
              <p>Thur:  8:30am - 4:30pm</p>
              <p>Fri:  8:30am - 4:30pm</p>
              </>}
              {screenSmall&&
             <>
              <p>Mon-Fri</p>
              <p>8:30am - 4:30pm</p>
              </>}

            </div>
          </div>
        </div>
        <div className='footer__section'>
          <h4 className="footer-header">Business</h4>
          <NavLink to='/about-us' aria-label="about">About Us</NavLink>
          <NavLink to='/contact-us' aria-label="contact">Contact Us</NavLink>
          <NavLink to='/designs' aria-label="designs">Designs</NavLink>
          <div>
          </div>
        </div>

        <div className='footer__section'>
          <h4 className="footer-header">Account</h4>
          {currUser&&
          <>
            <NavLink to="/order-history"aria-label="order history">Order History</NavLink>
            <NavLink to="/account-details"aria-label="account">Account</NavLink>
            <NavLink to="/" aria-label="logout" onClick={e => handleUserLogout(e)}>Logout</NavLink>
          </>}
          {!currUser&&
          <>
          <NavLink
              aria-label="sign in"
              onClick={() => toggleLogin()}
              className="sign-in"
          >Sign In</NavLink>
          <NavLink
              aria-label="register"
              onClick={() => toggleSignUp()}
              className="sign-in"
          >Register</NavLink>
          </>
          }
        </div>
      </div>
      <div className="footer__copyright">
      <p>© 2024 ALL U, Inc. All rights reserved | 9 Interstate Ave • Albany, NY
        12205</p>
      </div>
    </div>
  );
}

export default Footer;
