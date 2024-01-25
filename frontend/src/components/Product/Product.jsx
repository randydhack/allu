import { NavLink } from "react-router-dom";

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
      <div className="product__container">
          <img
            src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
            alt="t-shirt"
            width={500}
          />
        <form className="product__form">
            <h1>DESIGN NAME</h1>
            <div>
                <h4>CHOOSE AN OPTION</h4>
                <div>box box box</div>
            </div>
            <div>
                <h4>CHOOSE A COLOR</h4>
                <div>
                    color mapping
                </div>
            </div>

            <div>
                <h4>SELECT SIZES</h4>
                <div>
                    xs<input type="number" />
                </div>
            </div>


            <button>FINALIZE</button>
        </form>
      </div>
    </div>
  );
}

export default Product;
