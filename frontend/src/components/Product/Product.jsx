// Libaries
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { getAllProducts } from "../../store/ProductReducer";

// Icons
import { IoIosCheckmarkCircle } from "react-icons/io";

// Context
// import { ModalContext } from "../../context/modalContext";

// CSS
import "./Product.scss";
import { designDetails } from "../../store/designReducer";
import { createBatch } from "../../store/BatchReducer";
import { getCart } from "../../store/BatchReducer";
import { ModalContext } from "../../context/modalContext";

function Product() {
  const dispatch = useDispatch();
  const { designId } = useParams();

  const { toggleLogin } = useContext(ModalContext);

  // useSelectors
  const { allProducts, isLoaded, productColors, productSizes } = useSelector(
    (state) => state.products
  );
  const { singleDesign } = useSelector((state) => state.designs);
  const { user } = useSelector((state) => state.session);

  // useStates
  const [currentProduct, setCurrentProduct] = useState({
    id: 1,
    type: "Heavyweight Ring Spun Tee",
    price: 12.99,
  });
  const [color, setColor] = useState({
    id: 0,
    name: "banana",
    product_url: `https://allutestbucket.s3.amazonaws.com/tshirt/comfort_colors_banana.jpg`,
  });
  const [note, setNote] = useState("");
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

  const [confirmButton, setConfirmButtonState] = useState(true);
  const [productImage, setProductImage] = useState(
    `https://allutestbucket.s3.amazonaws.com/tshirt/comfort_colors_banana.jpg`
  );
  const [addNotification, setAddNotification] = useState("");


  // const [colorObj, setColorObj] = useState(null)

  // useEffects for fetching
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(designDetails(designId));
  }, [dispatch]);

  // useEffect for disabling button and css styling
  useEffect(() => {
    const checkSizes = Object.values(sizes).every((el) => el <= 0);

    console.log("sizes", sizes)
      setConfirmButtonState(checkSizes)

  }, [sizes, setSizes, setConfirmButtonState, confirmButton]);


  useEffect(() => {

    if (currentProduct.id === 1) {
      setProductImage(
        `https://allutestbucket.s3.amazonaws.com/tshirt/comfort_colors_${color.name}.jpg`
        );
      } else if (currentProduct.id === 2) {
        setProductImage(
          `https://allutestbucket.s3.amazonaws.com/hoodie/Gildan_Sweatshirt_${color.name}.jpg`
          );
        } else if (currentProduct.id === 3) {
          setProductImage(
            `https://allutestbucket.s3.amazonaws.com/lighttshirt/District_Tee_${color.name}.jpg`
            );
          }

  }, [setProductImage, color, setColor, productImage])


  // Functions
  function resetSelect(e) {
    let currentSelection = document.querySelector("div.selected");
    currentSelection.classList.remove("selected");
    e.target.classList.add("selected");
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    console.log("HANDLE SUBMIT", sizes)

    if (
      sizes["XS"] ||
      sizes["S"] ||
      sizes["M"] ||
      sizes["L"] ||
      sizes["XL"] ||
      sizes["2XL"] ||
      sizes["3XL"] ||
      sizes["4XL"] ||
      sizes["5XL"]
    ) {
      const data = await dispatch(
        createBatch({
          productId: currentProduct.id,
          size: sizes,
          designId: designId,
          color: color.name,
          total_price: currentProduct.price + singleDesign.design_price,
          product_url: productImage,
          note: note,
        })
      );

      if (data) {
        setAddNotification("Added to Cart");
        console.log("bfore",sizes)
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
        console.log("after", sizes)

        const field = document.getElementsByClassName("size_input");
        Array.from(field).forEach((el) => (el.value = ""));
        setNote("");
        setTimeout(() => {
          setAddNotification("");
        }, 5000);
      }
    }
  };


  return (
    isLoaded && (
      <div className="main_panel">
        <div className="left_panel">
          <div className="product-images">
            <div className="mini-images-container">
              <div style={{ display: "flex", flexDirection: "column" }}>

                <img
                  className="side_img"
                  src={
                    allProducts[currentProduct.id - 1].ProductImages[
                      color.id || 0
                    ]?.img_url
                  }
                  alt={`Product Image of ${color.name}`}
                />
              </div>
            </div>

            <img
              className="model_img"
              src={
                allProducts[currentProduct.id - 1]?.ProductImages[color.id || 0]
                  ?.img_url
              } //selects first image of that product with selected id
              alt={`Model Image wearing ${currentProduct.type}`}
            />
          </div>
          <div>
            <h3>Description</h3>
            <div>{allProducts[currentProduct.id - 1].description}</div>
          </div>
        </div>

        {/* FORM FOR PRODUCT / COLOR / SIZES */}
        <form className="product_form" onSubmit={(e) => handleProductSubmit(e)}>
          <h1>{currentProduct.type}</h1>

          <div>
            <h3 style={{ marginBottom: "5px" }}>Chosen Design:</h3>
            <img
              className="side_img design_img"
              src={singleDesign?.design_url}
              alt={`Design with id of${designId}`}
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
                  aria-label="product type"
                  style={{
                    border: `${
                      currentProduct.id === product.id ? "1px solid gray" : ""
                    }`,
                    borderRadius: "3px",
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
                      product_url:
                        allProducts[currentProduct.id - 1]?.ProductImages[
                          color.id || 0
                        ]?.img_url,
                    }); //sets color of main image back to first color with name
                    setProductImage(allProducts[currentProduct.id - 1]?.ProductImages[
                      color.id || 0
                    ]?.img_url)

                    console.log("all products", allProducts[currentProduct.id - 1]?.ProductImages[
                      color.id || 0
                    ]?.img_url)
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3>Select Color: {color.name}</h3>
            <div className="colors_carousel">
              {currentProduct.id &&
                productColors[currentProduct.id].map((colorElement, i) => {
                  return (
                    <div
                      key={colorElement.name + i}
                      aria-label="product color"
                      style={{
                        backgroundColor: `${colorElement.hex}`,
                      }}
                      className={i == 0 ? "selected" : ""}
                      onClick={(e) => {
                        setColor(() => { return {
                          id: i,
                          name: colorElement.name,
                        }});


                              resetSelect(e);

                      }}
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
                          //sizes["XL"] = e
                          sizes[size] = Number(e.target.value);
                          setSizes(() => {
                            return {
                              ...sizes,
                            };
                          });
                        }}
                        id="size_input"
                        className="size_input"
                        aria_label="product sizes"
                        min={0}
                      ></input>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="textinput-div">
            <label htmlFor="note_input">Add custom text to your design:</label>
            <textarea
              onChange={(e) => {
                setNote(e.target.value);
              }}
              id="note_input"
              className="note-input"
              aria_label="note"
              value={note}
            ></textarea>
          </div>
          {addNotification && (
            <p className="cart-added-msg">
              <IoIosCheckmarkCircle style={{ color: "green" }} />{" "}
              {addNotification}
            </p>
          )}

          {!user ? (
            <div className="finalize">
              <button
                style={{
                  backgroundColor: `black`,
                }}
                aria-label="sign up to create product"
                onClick={toggleLogin}
              >
                <span>Sign Up to Continue</span>
              </button>
            </div>
          ) : (
            <div className="finalize">
              <button
                type="submit"
                disabled={confirmButton}
                style={{
                  backgroundColor: `${!confirmButton ? "black" : "#E4E4E4"}`,
                  cursor: `${!confirmButton ? "pointer" : "default"}`,
                }}
                aria-label="submit product"
              >
                <span>Add to cart</span>
              </button>
            </div>
          )}
        </form>
      </div>
    )
  );
}

export default Product;
