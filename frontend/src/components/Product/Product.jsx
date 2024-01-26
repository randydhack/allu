import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from "react-modal";
// CSS
import "./Product.scss";

function Product() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  Modal.setAppElement("#root");
  const handleZoomOutClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
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

                <div
                  className="modal_overlay"
                  onClick={closeModal}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                />
                <button className="close_button" onClick={closeModal}>
                  X
                </button>
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
          <div className="top_right"></div>
        </div>
      </div>
    </div>
  );
}

export default Product;
