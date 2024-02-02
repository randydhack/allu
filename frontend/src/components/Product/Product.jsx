// Libaries
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { getAllProducts } from "../../store/ProductReducer";

// Icons
import { IoIosCheckmarkCircle } from "react-icons/io";

// Context
import { ModalContext } from "../../context/modalContext";

// CSS
import "./Product.scss";
import { designDetails } from "../../store/designReducer";
import { createBatch } from "../../store/BatchReducer";

function Product() {
  const dispatch = useDispatch();
  const { designId } = useParams();
  const { setIsModalOpen, setType } = useContext(ModalContext);

  const { allProducts, isLoaded, productColors, productSizes } = useSelector(
    (state) => state.products
  );

  const { singleDesign } = useSelector((state) => state.designs);


  const [currentProduct, setCurrentProduct] = useState({
    id: 1,
    type: "Heavyweight Ring Spun Tee",
    price: 12.99,
  });
  const [color, setColor] = useState({ id: 0, name: "banana", product_url: `https://allutestbucket.s3.amazonaws.com/tshirt/comfort_colors_banana.jpg` });
  const product_url = color.product_url

  const [sizes, setSizes] = useState({
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    "2XL": 0,
    "3XL": 0,
    "4XL": 0,
    "5XL": 0,
  });
  const [addNotification, setAddNotification] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(designDetails(designId));
  }, [dispatch]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (
      !sizes["XS"] ||
      !sizes["S"] ||
      !sizes["M"] ||
      !sizes["L"] ||
      !sizes["XL"] ||
      !sizes["2XL"] ||
      !sizes["3XL"] ||
      !sizes["4XL"] ||
      !sizes["5XL"]
    ) {
      const data = await dispatch(
        createBatch(
          currentProduct.id,
          sizes,
          designId,
          color.name,
          currentProduct.price + singleDesign.design_price,
          product_url,
        )
      );
          console.log(data)
      if (data) {
        setAddNotification("Added to Cart");
        setSizes({
          XS: 0,
          S: 0,
          M: 0,
          L: 0,
          XL: 0,
          "2XL": 0,
          "3XL": 0,
          "4XL": 0,
          "5XL": 0,
        });

        const field = document.getElementsByClassName('size_input');
        Array.from(field).forEach(el => el.value = "");

        setTimeout(() => {
          setAddNotification("");
        }, 5000);
      }
    }
  };
  return (
    isLoaded && (
      <div className="container">

        <div className="main_panel">
          <div className="left_panel">
            <div className="product-images">
              <div className="mini-images-container">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* <img
                    className="side_img design_img"
                    src={singleDesign?.design_url}
                    alt={`Design ${designId}`}
                  /> */}
                  <img
                    className="side_img"
                    src={
                      allProducts[currentProduct.id - 1].ProductImages[
                        color.id || 0
                      ]?.img_url
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
                  allProducts[currentProduct.id - 1]?.ProductImages[
                    color.id || 0
                  ]?.img_url
                } //selects first image of that product with selected id
                alt="Model Image"
              />
            </div>
            <div>
              <h3>Description</h3>
              <div>{allProducts[currentProduct.id - 1].description}</div>
            </div>
          </div>

          {/* FORM FOR PRODUCT / COLOR / SIZES */}
          <form
            className="product_form"
            onSubmit={(e) => handleProductSubmit(e)}
          >
            <h1>{currentProduct.type}</h1>

            <div>
              <h3 style={{marginBottom: "5px"}}>Chosen Design:</h3>
            <img
                    className="side_img design_img"
                    src={singleDesign?.design_url}
                    alt={`Design ${designId}`}
                  />
            </div>

            <div>
              <h3>Choose an option:</h3>
              <div className="product-option-main">
                {allProducts.map((product, id, colors) => (
                  <img
                    key={product.name + id}
                    src={allProducts[product.id - 1]?.ProductImages[0]?.img_url} //selects first image of that product with selected id
                    width={50}
                    height={50}
                    className="product-option-img"
                    style={{
                      border: `${
                        currentProduct.id === product.id
                          ? "1px solid gray"
                          : ""
                      }`,
                      borderRadius: '3px'
                    }}
                    onClick={() => {
                      setCurrentProduct({
                        id: product.id,
                        type: product.name,
                        price: product.price,
                      });
                      setColor({
                        id: 0,
                        name: colors[product.id - 1]?.colors[0].name,
                        product_url: allProducts[currentProduct.id - 1]?.ProductImages[
                          color.id || 0
                        ]?.img_url
                      }); //sets color of main image back to first color with name
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3>Select Color: {color.name}</h3>
              <div className="colors_carousel">
                {currentProduct.id &&
                  productColors[currentProduct.id].map((color, i) => {
                    return (
                      <div
                        key={color.name + i}
                        style={{
                          backgroundColor: `${color.hex}`,
                        }}
                        onClick={() => setColor({ id: i, name: color.name, product_url: allProducts[currentProduct.id - 1]?.ProductImages[
                          color.id || 0
                        ]?.img_url })}
                      ></div>
                    );
                  })}
              </div>
            </div>

            <div>
              <h3>Select Sizes</h3>
              <div className="size_panel">
                {currentProduct.id &&
                  productSizes[currentProduct.id].map((size, i) => {
                    return (
                      <div key={size + i} className="size_input_container">
                        <span style={{ width: "100%", textAlign: "right" }}>
                          {size}
                        </span>{" "}
                        <input
                          type="number"
                          onChange={(e) => {
                            sizes[size] = Number(e.target.value);
                            setSizes(sizes);
                          }}
                          id="size_input"
                          className="size_input"
                        ></input>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="finalize">
              <button type="submit">
                <span>Add to cart</span>
              </button>
            </div>
            {addNotification && (
              <p className="cart-added-msg">
                <IoIosCheckmarkCircle style={{ color: "green" }} />{" "}
                {addNotification}
              </p>
            )}
          </form>
        </div>
      </div>
    )
  );
}

export default Product;
