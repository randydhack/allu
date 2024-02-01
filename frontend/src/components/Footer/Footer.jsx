// Libaries
import { NavLink } from 'react-router-dom'

// CSS
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__main">
        <div className='footer__section'>
          <h4 className="footer-header">Showroom Hours:</h4>
          <div className="showroom__schedule">
            <div>
              <p>Mon:</p>
              <p>Tue:</p>
              <p>Wed:</p>
              <p>Thur:</p>
              <p>Fri:</p>
            </div>
            <div>
              <p>8:30am - 4:30pm</p>
              <p>8:30am - 4:30pm</p>
              <p>8:30am - 4:30pm</p>
              <p>8:30am - 4:30pm</p>
              <p>8:30am - 4:30pm</p>
            </div>
          </div>
        </div>
        <div className='footer__section'>
          <h4 className="footer-header">Business</h4>
          <NavLink to='/about-us'>About Us</NavLink>
          <NavLink to='/contact-us'>Contact Us</NavLink>
          <NavLink to='/designs'>Designs</NavLink>
          <div>
          </div>
        </div>

        <div className='footer__section'>
          <h4 className="footer-header">Account</h4>
          <NavLink >Order History</NavLink>
          <NavLink>Account</NavLink>
          <NavLink>Logout</NavLink>
        </div>
      </div>
      <div className="footer__copyright">
        © 2024 ALL U, Inc. All rights reserved | 9 Interstate Ave • Albany, NY
        12205
      </div>
    </div>
  );
}

export default Footer;
