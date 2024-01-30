import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/BatchReducer";
import "./Checkout.scss";

function Checkout() {
  const handleRemoveFromCart = (itemId) => {
    console.log("Remove item:", itemId);
  };
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState({});

  const dispatch = useDispatch();
  const { cart, isLoaded } = useSelector((state) => state.batches);

  useEffect(() => {
    (async () => {
      await dispatch(getCart());
    })();
  }, [dispatch]);

  const formatBatchSizes = (batch) => {
    if (!batch || !batch.Batches)
      return { sizeDescriptions: "", totalQuantity: 0 };

    const batchData = batch.Batches;
    const sizes = ["xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];
    const sizeDescriptions = sizes
      .map((size) =>
        batchData[size] ? `${batchData[size]}${size.toUpperCase()}` : ""
      )
      .filter((desc) => desc !== "")
      .join(",");

    const totalQuantity = sizes.reduce(
      (sum, size) => sum + (batchData[size] || 0),
      0
    );

    return { sizeDescriptions, totalQuantity };
  };

  const calculateSubtotal = () => {
    return Object.values(cart).reduce((total, batch) => {
      const { totalQuantity } = formatBatchSizes(batch);
      return total + batch.total_price * totalQuantity;
    }, 0);
  };
  console.log(cart);

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
                <div key={item.id} className="home-item-row">
                  {/* <div className="home-item-image-container">
                    <img
                      className="home-item-image"
                      src={item.image}
                      alt={item.name}
                    />
                  </div> */}
                  <div className="home-item-info-container">
                    <h3 className="home-item-title">{item["Batches.color"]}</h3>
                  </div>
                  <div className="home-item-size">{sizeDescriptions}</div>
                  <div className="home-item-quantity">{totalQuantity}</div>
                  <div className="home-item-change"></div>
                  <div className="home-item-price">${item.total_price}</div>
                  <button
                    className="removal"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              );
            })}
            <div className="subtotal">
              Subtotal: ${calculateSubtotal().toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Checkout;
