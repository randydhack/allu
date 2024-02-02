import PickupForm from "./PickupForm";
import DeliveryForm from "./DeliveryForm";
import { useState } from "react";
import { createOrder } from "../../store/order";
import { useDispatch } from "react-redux";
// import { useContext } from "react"
import { useSelector } from "react-redux";

import "./PickupAndDelivery.scss";
import { useNavigate } from "react-router-dom";

function PickupAndDelivery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);

  const [isDelivery, setIsDelivery] = useState(true);
  const [formInfo, setFormInfo] = useState({});

  function handleFormSubmit(e) {
    e.preventDefault();

    let order;
    if (isDelivery) {
      let address = `${formInfo["address1"]} ${formInfo["address2"]} ${formInfo["city"]} ${formInfo["state"]} ${formInfo["zip"]}`;
      order = {
        userId: currUser.id,
        address: address,
        firstName: formInfo["firstName"],
        lastName: formInfo["lastName"],
        phone: formInfo["phone"],
        email: formInfo["email"],
        special_request: formInfo["special-request"],
        workforce: false,
      };
      console.log(order);
    }
    //send all or some fields to backend (depending on pickup or delivery)
    else {
      order = {
        userId: currUser.id,
        firstName: formInfo["firstName"],
        lastName: formInfo["lastName"],
        phone: formInfo["phone"],
        email: formInfo["email"],
        // special_request: formInfo["special-instructions"],
        workforce: false,
      };
    }

    let orderCreated = dispatch(createOrder(order));

    if (orderCreated) {
      return navigate("/order-submitted");
    }
  }

  function formChange(e) {
    let currentFormInfo = { ...formInfo };
    currentFormInfo[e.target.name] = e.target.value;
    setFormInfo(currentFormInfo);
  }

  return (
    <div className="pickup-delivery-page">
      <header>
        <h1>FINALIZE YOUR ORDER</h1>
        <div className="divider"></div>
      </header>

      <div className="checkout_options">
        <p style={{ marginRight: "25px" }}>Checkout Options:</p>
        <div className="radio-button-container">
          <div className="radio-option" style={{ width: "fit-content" }}>
            <input
              type="radio"
              id="delivery"
              defaultChecked
              name="pickup-or-delivery"
              onChange={() => setIsDelivery(true)}
            />
            <p>Delivery</p>
          </div>
          <span>or</span>
          <div className="radio-option">
            <input
              type="radio"
              id="delivery"
              value={false}
              name="pickup-or-delivery"
              onChange={() => setIsDelivery(false)}
            />
            <p>Pick up at 9 Interstate Ave, Albany NY</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="checkout-form-main">
        {isDelivery ? (
          <DeliveryForm setFormInfo={setFormInfo} formInfo={formInfo} formChange={formChange}/>
        ) : (
          <PickupForm setFormInfo={setFormInfo} formInfo={formInfo} formChange={formChange}/>
        )}

        <div className="special-request-form">
            <label htmlFor="special-request">Additional Information</label>
          <textarea
            name="special-request"
            id="special-request"
            cols="30"
            rows="10"
            placeholder="Any additional information about the order or special request."
            onChange={formChange}
            value={formInfo["special-request"] || ""}
          ></textarea>
        </div>

        <div className="submit-order-main">
          <p>
            Submitting this will finalize your order and be reviewed before
            shipping.
          </p>
          <button type="submit">Submit Order</button>
        </div>
      </form>
    </div>
  );
}

export default PickupAndDelivery;
