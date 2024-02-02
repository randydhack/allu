import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteBatch } from "../../store/BatchReducer";
// import EditBatchModal from "../Modals/EditBatchModal";
import { InfoContext } from "../../context/infoContext";
import { ModalContext } from "../../context/modalContext";
import { useNavigate } from "react-router-dom";

import "./Checkout.scss";
import PickupAndDelivery from "../PickupAndDelivery/PickupAndDelivery";

function Checkout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Context
  const { toggleEditBatchModal } =
    useContext(ModalContext);
  const { setBatchDetails } = useContext(InfoContext);

  // States
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditingBatchId, setCurrentEditingBatchId] = useState(null);
  const { cart, isLoaded } = useSelector((state) => state.batches);

  // Remove Cart handle
  const handleRemoveFromCart = (itemId) => {
    dispatch(deleteBatch(itemId));
  };

  useEffect(() => {
    (async () => {
      await dispatch(getCart());
    })();
  }, [dispatch]);

  // Format Batch sizes
  const formatBatchSizes = (batch) => {
    const sizes = ["xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];
    const sizeDescriptions = sizes
      .map((size) =>
        batch[`Batches.${size}`]
          ? `${batch[`Batches.${size}`]}${size.toUpperCase()}`
          : ""
      )
      .filter((desc) => desc !== "")
      .join(",");

    const totalQuantity = sizes.reduce(
      (sum, size) => sum + (batch[`Batches.${size}`] || 0),
      0
    );

    return { sizeDescriptions, totalQuantity };
  };

  // Calculate Cart Total
  const calculateSubtotal = (cart) => {
    return cart.reduce((total, item) => {
      const { totalQuantity } = formatBatchSizes(item);
      const itemPrice = item["Batches.total_price"];
      return total + itemPrice * totalQuantity;
    }, 0);
  };

  // Handle Modal
  const handleOpenEditModal = (item) => {
    const batchDetails = cart.find(
      (b) => b["Batches.id"] === item["Batches.id"]
    );
    setBatchDetails(batchDetails);
    toggleEditBatchModal();
  };

  function goToShip(){
    navigate('/shipping-information', {state:{quote:calculateSubtotal(cart).toFixed(2)}});
  }


  return (
    <div className="checkout_page">
      <header className="checkout_header">CURRENT ORDER</header>
      <div className="checkout_main_body">
        {isLoaded && (!cart || cart.length === 0) ? (
          <div className="empty-cart-message">Your cart is empty.</div>
        ) : (
          <div className="home-items-container">
            <div className="home-item-row header-row">
              <div className="home-item-image-container">Image Preview</div>
              <div className="home-item-info-container">Color</div>
              <div className="home-item-size">Size</div>
              <div className="home-item-quantity">Quantity</div>
              <div className="home-item-change">Change Quantity</div>
              <div className="home-item-price">Unit Price</div>
              <div className="removal">Remove</div>
            </div>
            {cart.map((item) => {
              const { sizeDescriptions, totalQuantity } =
                formatBatchSizes(item);
              return (
                <div key={item["Batches.id"]} className="home-item-row">
                  <div className="home-item-image-container">
                    <img
                      className="home-item-image"
                      src={item["Batches.Design.design_url"]}
                      alt={item.name}
                    />
                  </div>
                  <div className="home-item-info-container">
                    <h3 className="home-item-title">{item["Batches.color"]}</h3>
                  </div>
                  <div className="home-item-size">{sizeDescriptions}</div>
                  <div className="home-item-quantity">{totalQuantity}</div>
                  <div className="home-item-change">
                    <button
                      onClick={() => {
                        handleOpenEditModal(item);
                      }}
                    >
                      Edit Sizes
                    </button>
                  </div>
                  <div className="home-item-price">
                    ${item["Batches.total_price"]}
                  </div>
                  <button
                    className="removal"
                    onClick={() => handleRemoveFromCart(item["Batches.id"])}
                  >
                    Remove from Cart
                  </button>
                </div>
              );
            })}
            <div className="subtotal">
              Subtotal: ${calculateSubtotal(cart).toFixed(2)}
            </div>
            <button className="continue-button" onClick={goToShip}>Continue</button>
            {/* {isEditModalOpen && (
              <EditBatchModal
                batchId={currentEditingBatchId}
                batchDetails={cart.find(
                  (b) => b["Batches.id"] === currentEditingBatchId
                )}
                closeModal={() => setIsEditModalOpen(false)}
              />
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}
export default Checkout;
