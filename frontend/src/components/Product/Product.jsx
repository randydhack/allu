// Libaries
import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { getAllProducts } from "../../store/ProductReducer";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";

// Context
import ProductModal from "../Modals/ProductModal";
import { ModalContext } from "../../context/modalContext";

// CSS
import "./Product.scss";

function Product() {
  const dispatch = useDispatch();
  const { setIsModalOpen, setType } = useContext(ModalContext);

  const { allProducts, isLoaded, productColors, productSizes } = useSelector(
    (state) => state.products
  );

  const [product, setProduct] = useState({ id: 1, type: "Heavy-T" });
  const [color, setColor] = useState({ id: 0, colorName: "banana"});

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="container">
        <div className="product__directory_history">
          <span>
            <NavLink to="/">Home</NavLink> /
            <NavLink to="/our-designs">Our Designs</NavLink> /
            <NavLink>DESIGN NAME</NavLink>
          </span>
        </div>

        <div className="main_panel">
          <div className="left_panel">
            <div>
              <img
                className="side_img"
                src={allProducts[product.id - 1].ProductImages[color.id || 0]?.img_url}
                alt={`Product Image - ${color.colorName}`}
              />
            </div>
            <div>
              <img
                className="model_img"
                src={allProducts[product.id - 1]?.ProductImages[color.id || 0]?.img_url} //selects first image of that product with selected id
                alt="Model Image"
              />
              <h1>description</h1>
              <div>{allProducts[product.id - 1].description}</div>
            </div>
          </div>

          {/* FORM FOR PRODUCT / COLOR / SIZES */}
          <form className="product_form">
            <h1>Product</h1>

            <div>
              <h3>Choose an option: {product.type}</h3>
              <div>
                {allProducts.map((product, id, colors) => (
                  <img
                    key={product.name + id}
                    src={allProducts[product.id - 1]?.ProductImages[0]?.img_url} //selects first image of that product with selected id
                    width={50}
                    height={50}
                    className="product-option-img"
                    onClick={() => {
                      setProduct({ id: product.id, type: product.name })
                      setColor({ id: 0, colorName: colors[product.id-1]?.colors[0].name }) //sets color of main image back to first color with name
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3>Colors - {color.colorName}</h3>
              <div className="colors_carousel">
                {product.id && productColors[product.id].map((color, i) => {
                        return (
                          <div
                            key={color.name + i}
                            style={{
                              backgroundColor: `${color.hex}`,
                            }}
                            onClick={() => setColor({id: i, colorName: color.name})}
                          ></div>
                        );
                      })}

              </div>
            </div>

            <div>
              <h3>Sizes</h3>
              <div className="size_panel">
                {product.id && productSizes[product.id].map((size, i) => {
                  return <div key={size + i} className="size_input_container">
                  <span style={{width: '100%', textAlign: 'right'}}>{size}</span> <input type="number"></input>
                </div>;
                })}
              </div>
            </div>
              <button className="confirm_button" type="submit">
                  FINALIZE SELECTION
              </button>
          </form>
        </div>
      </div>
    )
  );
}

export default Product;
