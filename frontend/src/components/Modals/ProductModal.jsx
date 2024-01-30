// ProductModal.js
import React, { useContext } from "react";
import { ModalContext } from "../../context/modalContext";

const ProductModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className={`product_modal`} onClick={closeModal}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        <img
          className="modal_img"
          src="https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg"
          alt="Modal Image"
          style={{ position: "relative", zIndex: 1 }}
        />
        <button className="close_button" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
