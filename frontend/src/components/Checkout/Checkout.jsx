import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBatches } from "../../store/BatchReducer";
import "./Checkout.scss";

function Checkout() {
  const handleRemoveFromCart = (itemId) => {
    console.log("Remove item:", itemId);
  };
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState({});

  const dispatch = useDispatch();
  const { allBatches, isLoaded } = useSelector((state) => state.batches);

  useEffect(() => {
    dispatch(getAllBatches());
  }, [dispatch]);

  const [items, setItems] = useState([
    {
      id: "item1",
      name: "clothAclothAclothAclothAclothAclothA",
      size: "L",
      image:
        "https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg",
      quantity: 2,
      price: 99.99,
    },
    {
      id: "item2",
      name: "clothB",
      size: "L",
      image:
        "https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg",
      quantity: 1,
      price: 19.99,
    },
    {
      id: "item3",
      name: "clothC",
      size: "L",
      image:
        "https://assets.hermes.com/is/image/hermesproduct/h-embroidered-t-shirt--072025HA01-worn-1-0-0-800-800_g.jpg",
      quantity: 3,
      price: 49.99,
    },
  ]);

  const handleEditQuantity = (itemId) => {
    setEditingItemId(itemId);
    setEditedQuantity((prev) => ({
      ...prev,
      [itemId]: items.find((item) => item.id === itemId).quantity,
    }));
  };

  const handleQuantityChange = (itemId) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: editedQuantity[itemId] }
          : item
      )
    );
    setEditingItemId(null);
  };

  const handleQuantityInputChange = (itemId, newQuantity) => {
    setEditedQuantity((prev) => ({ ...prev, [itemId]: newQuantity }));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout_page">
      <div>
        <h2>Batches:</h2>
        {isLoaded ? (
          <ul>
            {allBatches?.map((batch) => (
              <li key={batch.id}>
                {batch.name /* Adjust according to your batch structure */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading batches...</p>
        )}
      </div>
      <header className="checkout_header">CURRENT ORDER</header>
      <div className="checkout_main_body">
        {items.length === 0 ? (
          <div className="empty-cart-message">Your cart is empty.</div>
        ) : (
          <div className="home-items-container">
            <div className="home-item-row header-row">
              <div className="home-item-image-container">Image Preview</div>
              <div className="home-item-info-container">Name</div>
              <div className="home-item-size">Size</div>
              <div className="home-item-quantity">Quantity</div>
              <div className="home-item-change">Change Quantity</div>
              <div className="home-item-price">Unit Price</div>
              <div className="removal">Remove</div>
            </div>
            {items.map((item) => (
              <div key={item.id} className="home-item-row">
                <div className="home-item-image-container">
                  <img
                    className="home-item-image"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="home-item-info-container">
                  <h3 className="home-item-title">{item.name}</h3>
                </div>
                <div className="home-item-size">{item.size}</div>
                <div className="home-item-quantity">{item.quantity}</div>
                <div className="home-item-change">
                  {editingItemId === item.id ? (
                    <>
                      <input
                        className="change_quantity"
                        type="number"
                        value={editedQuantity[item.id]}
                        onChange={(e) =>
                          handleQuantityInputChange(
                            item.id,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      <button
                        className="confirm-button"
                        onClick={() => handleQuantityChange(item.id)}
                      >
                        Confirm
                      </button>
                    </>
                  ) : (
                    <button
                      className="edit-button"
                      onClick={() => handleEditQuantity(item.id)}
                    >
                      Edit Quantity
                    </button>
                  )}
                </div>
                <div className="home-item-price">${item.price}</div>
                <button
                  className="removal"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove from Cart
                </button>
              </div>
            ))}
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
