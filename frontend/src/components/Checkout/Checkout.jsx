// Libaries
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Store
import { getCart, deleteBatch } from "../../store/BatchReducer";

// Components
import PickupAndDelivery from "../PickupAndDelivery/PickupAndDelivery";

// Context
import { InfoContext } from "../../context/infoContext";
import { ModalContext } from "../../context/modalContext";

// CSS
import "./Checkout.scss";

// Icons
import { CiSquareRemove } from "react-icons/ci";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Context
  const { toggleEditBatchModal } = useContext(ModalContext);
  const { setBatchDetails } = useContext(InfoContext);

  // States
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditingBatchId, setCurrentEditingBatchId] = useState(null);
  const { cart: rawCart, isLoaded } = useSelector((state) => state.batches);
  // Filter out any batches with a null id
  const cart = rawCart?.filter((batch) => batch["Batches.id"] !== null);

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
    const sizes = ["xs", "s", "m", "l", "xl", "2l", "3xl", "4xl", "5xl"];
    const sizeDescriptions = sizes
      .map((size) =>
        batch[`Batches.${size}`]
          ? ` ${batch[`Batches.${size}`]} ${size.toUpperCase()}`
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
      <div className="checkout_main_body">
        <header className="checkout_header">
          <h1>CURRENT ORDER</h1>
        </header>
        {isLoaded && (!cart || cart.length === 0) ? (
          <div className="empty_cart_message">Your cart is empty.</div>
        ) : (
          <div className="home-items-container">
            <div className="home-item-row header-row">
              <div className="home-item-image-container">Item Preview</div>
              <div className="home-item-info-container">Color</div>
              <div className="home-item-size">Size</div>
              <div className="home-item-quantity">Quantity</div>
              <div className="home-item-price">Unit Price</div>
              <div className="removal">Edit</div>
              <div className="removal">Remove</div>
            </div>
            {cart.map((item, idx) => {
              const { sizeDescriptions, totalQuantity } =
                formatBatchSizes(item);
              return (
                <div key={item["Batches.id"] + idx} className="home-item-row">
                  <div className="home-item-image-container border_bottom">
                    <img
                      className="home-item-image"
                      src={item["Batches.Design.design_url"]}
                      alt={item.name}
                    />
                    <img
                      className="home-item-image"
                      src={item["Batches.product_url"]}
                      alt={"design image"}
                    />
                  </div>
                  <div className="home-item-info-container">
                    <h3 className="home-item-title">{item["Batches.color"]}</h3>
                  </div>
                  <div className="home-item-size">{sizeDescriptions}</div>
                  <div className="home-item-quantity">{totalQuantity}</div>
                  <div className="home-item-price">
                    ${item["Batches.total_price"]}
                  </div>
                  <div className="removal">
                    <button
                      className="edit-button"
                      aria-label="edit batch"
                      onClick={() => {
                        handleOpenEditModal(item);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="removal">
                    <CiSquareRemove
                      className="remove-button remove-icon"
                      onClick={() => handleRemoveFromCart(item["Batches.id"])}
                    />
                  </div>
                </div>
              );
            })}
            <div className="subtotal">
              <p>
                Subtotal: <span>${calculateSubtotal(cart).toFixed(2)}</span>
              </p>
              <button
                className="navigate-shipping"
                aria-label="checkout"
                onClick={() => goToShip()}
                style={{backgroundColor: `${cart.length ? "black" : "#E4E4E4"}`}}
              >
                <p style={{color: `${cart.length ? "white":"#707070"}`}}>Continue to shipping</p>
              </button>
            </div>
            {/* <button className="continue-button" onClick={goToShip}>Continue</button> */}
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
