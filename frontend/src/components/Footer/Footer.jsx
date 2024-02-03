// Libaries
import { NavLink } from 'react-router-dom'
import {useState, useEffect}from 'react';
// CSS
import "./Footer.scss";

function Footer() {
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
            {/* <div>
              <p>8:30am - 4:30pm</p>
              <p>8:30am - 4:30pm</p>
              <p>8:30am - 4:30pm</p>
              <p>8:30am - 4:30pm</p>
              <p>8:30am - 4:30pm</p>
            </div> */}
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
          <NavLink aria-label="order history">Order History</NavLink>
          <NavLink aria-label="account">Account</NavLink>
          <NavLink aria-label="logout">Logout</NavLink>
        </div>
      </div>
      <div className="footer__copyright">
      <p>© 2024 ALL U, Inc. All rights reserved |</p><p>9 Interstate Ave • Albany, NY
        12205</p> 
      </div>
    </div>
  );
}

export default Footer;
