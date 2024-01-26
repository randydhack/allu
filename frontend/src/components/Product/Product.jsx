import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";
// CSS
import "./Product.scss";

function Product() {
  return (
    <div className="container">
      <div className="product__directory_history">
        <span>
          <NavLink to="/">Home</NavLink> /{" "}
          <NavLink to="/our-designs">Our Designs</NavLink> /{" "}
          <NavLink>DESIGN NAME</NavLink>
        </span>
      </div>

      <div className="main_panel">
        <div className="top_panel">
          <div className="top_left">
            <div className="design_preview">
              <button className="zoom_out"
                // onClick={handleZoomOutClick}
                style={{
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faSearchMinus} />
              </button>
            </div>
          </div>
          <div className="top_mid">
            <img
              src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
              alt="t-shirt"
              width={500}
            />
          </div>
          <div className="top_right"></div>
        </div>
      </div>
    </div>
  );
}

export default Product;
