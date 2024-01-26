import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from "react-modal";
// CSS
import "./Product.scss";

function Product() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = {
    red: "#ff0000",
    blue: "#0000ff",
    green: "#00ff00",
    white: "#FFFFFF",
  };

  Modal.setAppElement("#root");
  const handleZoomOutClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function selectImage(imageId) {
    document.querySelectorAll("#imageSelection img").forEach((img) => {
      img.classList.remove("selected");
    });

    document
      .querySelector(`#imageSelection img:nth-child(${imageId})`)
      .classList.add("selected");
  }

  function selectColor(color) {
    document.querySelectorAll("#colorSelection div").forEach((div) => {
      div.classList.remove("selected");
    });

    document
      .querySelector(`#colorSelection div[onclick="selectColor('${color}')"]`)
      .classList.add("selected");
  }

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
              <button
                className="zoom_out"
                onClick={handleZoomOutClick}
                style={{
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faSearchMinus} />
              </button>

              <Modal
                className={"product_modal"}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                onClick={closeModal}
              >
                <div className="modal_container" onClick={() => closeModal()}>
                  <img
                    className="modal_img"
                    src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
                    alt="Modal Image"
                    style={{
                      position: "relative",
                      zIndex: 1,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />

                  <button className="close_button" onClick={closeModal}>
                    X
                  </button>
                </div>
              </Modal>
            </div>
          </div>
          <div className="top_mid">
            <img
              src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
              alt="t-shirt"
              width={500}
            />
            <p>Description:</p>
          </div>
          <div className="top_right">
            <p className="product_name">PRODUCT NAME</p>
            <p>Choose an option:</p>
            <form id="product_form">
              <div id="imageSelection">
                {[1, 2, 3].map((id) => (
                  <img
                    key={id}
                    src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
                    width={50}
                    height={50}
                    onClick={() => setSelectedImageId(id)}
                    className={selectedImageId === id ? "selected" : ""}
                  />
                ))}
              </div>

              <div id="colorSelection">
                <div className="color_name">
                  Colors -
                  {selectedColor
                    ? selectedColor.charAt(0).toUpperCase() +
                      selectedColor.slice(1)
                    : "Select a color"}
                </div>
                {Object.entries(colors).map(([colorName, colorValue]) => (
                  <div
                    key={colorName}
                    className="color-circle"
                    style={{ backgroundColor: colorValue }}
                    onClick={() => setSelectedColor(colorName)}
                  ></div>
                ))}
              </div>

              <div id="sizeQuantity">
                <div>
                  <label>S</label>
                  <input type="number" name="size_S" />
                </div>
              </div>

              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
