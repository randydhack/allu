// Libaries
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
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
import { designDetails } from "../../store/designReducer";
import { createBatch } from "../../store/BatchReducer";

function Product() {
  const dispatch = useDispatch();
  const {designId} = useParams()
  const { setIsModalOpen, setType } = useContext(ModalContext);

  console.log(designId)

  const { allProducts, isLoaded, productColors, productSizes } = useSelector(
    (state) => state.products
  );

  const {singleDesign} = useSelector(state => state.designs)

  console.log(singleDesign)

  const [product, setProduct] = useState({ id: 1, type: "Heavy-T", price: 12.99 });
  const [color, setColor] = useState({ id: 0, name: "banana" });

  const [sizes, setSizes] = useState({XS: 0, S: 0, M: 0, L: 0, XL: 0, "2XL": 0, "3XL": 0, "4XL": 0, "5XL": 0})
  const [addNotification, setAddNotification] = useState("")
  console.log(sizes)



  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(designDetails(designId))
  }, [dispatch]);

  const handleProductSubmit = async (e) => {
    e.preventDefault()

    const data = await dispatch(createBatch(product.id, sizes, designId, color.name, product.price + singleDesign.design_price))

    if (data) {
      setAddNotification("Added to Cart")
      setSizes({XS: 0, S: 0, M: 0, L: 0, XL: 0, "2XL": 0, "3XL": 0, "4XL": 0, "5XL": 0})
    }

  }

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
            <div className="product-images">
              <div className="mini-images-container">
                <div style={{display: "flex", flexDirection: "column"}}>
                  <img className="side_img" src={singleDesign.design_url} alt={`Design ${designId}`} />
                <img
                  className="side_img"
                  src={
                    allProducts[product.id - 1].ProductImages[color.id || 0]
                      ?.img_url
                  }
                  alt={`Product Image - ${color.name}`}
                />
                </div>
                {/* {allProducts[product.id - 1].ProductImages.map(
                  (productImage, idx) => {
                    return (
                      <>
                        {productImage.id !==
                          allProducts[product.id - 1].ProductImages[
                            color.id || 0
                          ] && <img
                          className="side_img_map side_img"
                          src={
                            productImage
                              ?.img_url
                          }
                          alt={`Product Image - ${color.name}`}
                          />}
                      </>
                    );
                  }
                )} */}
              </div>

              <img
                className="model_img"
                src={
                  allProducts[product.id - 1]?.ProductImages[color.id || 0]
                    ?.img_url
                } //selects first image of that product with selected id
                alt="Model Image"
              />
            </div>
            <div>
              <h3>description</h3>
              <div>{allProducts[product.id - 1].description}</div>
            </div>
          </div>

          {/* FORM FOR PRODUCT / COLOR / SIZES */}
          <form className="product_form" onSubmit={(e) => handleProductSubmit(e)}>
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
                      setProduct({ id: product.id, type: product.name, price: product.price });
                      setColor({
                        id: 0,
                        name: colors[product.id - 1]?.colors[0].name,
                      }); //sets color of main image back to first color with name
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3>Select Color: {color.name}</h3>
              <div className="colors_carousel">
                {product.id &&
                  productColors[product.id].map((color, i) => {
                    return (
                      <div
                        key={color.name + i}
                        style={{
                          backgroundColor: `${color.hex}`,
                        }}
                        onClick={() =>
                          setColor({ id: i, name: color.name })
                        }
                      ></div>
                    );
                  })}
              </div>
            </div>

            <div>
              <h3>Select Sizes</h3>
              <div className="size_panel">
                {product.id &&
                  productSizes[product.id].map((size, i) => {
                    return (
                      <div key={size + i} className="size_input_container">
                        <span style={{ width: "100%", textAlign: "right" }}>
                          {size}
                        </span>{" "}
                        <input type="number" onChange={(e) => {
                          sizes[size] = Number(e.target.value)
                          setSizes(sizes)
                          console.log(sizes)
                        }}></input>
                      </div>
                    );
                  })}
              </div>
            </div>
            {addNotification && <p>{addNotification}</p>}
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
