// CSS
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__main">
        <div>
          <h4 className="showroom__header">Showroom Hours:</h4>
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
        <div>
          <h4>For sales inquiry</h4>
        </div>
        <div>
          <h4>Company</h4>
          <div>

          </div>
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
