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
  const [color, setColor] = useState({ id: 0, colorName: "bannana"});

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  // console.log("all products", allProducts)
  // console.log("sizes", productSizes)
  // console.log("colors", productColors)
  // console.log(isLoaded)
  console.log(color)
  console.log(product)

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
              <div>description</div>
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
                    onClick={() => {
                      console.log("COLORS", colors)
                      console.log("COLOR", color)
                      console.log("ID", id)
                      setColor({ id: product.id, colorName: colors[product.id]?.colors[0].name })
                      setProduct({ id: product.id, type: product.name })
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
          </form>
        </div>
      </div>

      //   {/* <div className="main_panel">
      //     <div className="top_panel">
      //       <div className="top_mid">
      //       <div className="top_left">
      //         <div className="design_preview">
      //           <button
      //             className="zoom_out"
      //             onClick={handleZoomOutClick}
      //             style={{
      //               cursor: "pointer",
      //             }}
      //           >
      //             <FontAwesomeIcon icon={faSearchMinus} />
      //           </button>
      //           <img
      //             className="modal_img"
      //             src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
      //             alt="Modal Image"
      //           />
      //         </div>
      //       </div>
      //       <div className="product-mid-section">
      //         <img
      //           src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
      //           alt="t-shirt"
      //         />
      //         <p>Description:</p>
      //       </div>
      //       </div>
      //       <div className="top_right">
      //         <p className="product_name">Product Name</p>
      //         <p>Choose An Option:</p>
      //         <form id="product_form">
      //           <div id="imageSelection">
      //             {[1, 2, 3].map((id) => (
      //               <img
      //                 key={id}
      //                 src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
      //                 width={50}
      //                 height={50}
      //                 onClick={() => setSelectedImageId(id)}
      //                 className={selectedImageId === id ? "selected" : ""}
      //               />
      //             ))}
      //           </div>

      //           <div id="colorSelection">
      //             <div className="color_name">
      //               Colors -
      //               {selectedColor
      //                 ? selectedColor.charAt(0).toUpperCase() +
      //                   selectedColor.slice(1)
      //                 : "Select a color"}
      //             </div>
      //             {Object.entries(colors).map(([colorName, colorValue]) => (
      //               <div
      //                 key={colorName}
      //                 className="color-circle"
      //                 style={{ backgroundColor: colorValue }}
      //                 onClick={() => setSelectedColor(colorName)}
      //               ></div>
      //             ))}
      //           </div>

      //           <div id="size_quantity">
      //             <p>Select A Size And Quantity</p>
      //             <div className="size_chart">
      //               <div>
      //                 <label>XS</label>
      //                 <input type="number" name="size_XS" />
      //               </div>
      //               <div>
      //                 <label>S</label>
      //                 <input type="number" name="size_S" />
      //               </div>
      //               <div>
      //                 <label>M</label>
      //                 <input type="number" name="size_M" />
      //               </div>
      //               <div>
      //                 <label>L</label>
      //                 <input type="number" name="size_L" />
      //               </div>
      //               <div>
      //                 <label>XL</label>
      //                 <input type="number" name="size_XL" />
      //               </div>
      //               <div>
      //                 <label>2XL</label>
      //                 <input type="number" name="size_2XL" />
      //               </div>
      //               <div>
      //                 <label>3XL</label>
      //                 <input type="number" name="size_3XL" />
      //               </div>
      //               <div>
      //                 <label>4XL</label>
      //                 <input type="number" name="size_4XL" />
      //               </div>
      //               <div>
      //                 <label>5XL</label>
      //                 <input type="number" name="size_5XL" />
      //               </div>
      //             </div>
      //           </div>

      //           <button className="confirm_button" type="submit">
      //             FINALIZE SELECTION
      //           </button>
      //         </form>
      //         <p className="place_holder">LOREM IPSUM</p>
      //       </div>
      //     </div>
      //   </div>
      // </div> */}
    )
  );
}

export default Product;
