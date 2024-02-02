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

  const handleSubmitForm = (e) => {};

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

      <form action="" className="checkout-form-main">
        {isDelivery ? (
          <DeliveryForm setFormInfo={setFormInfo} formInfo={formInfo} />
        ) : (
          <PickupForm />
        )}

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

  //   // const { user } = useContext(InfoContext);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const currUser = useSelector((state) => state.session.user);

  //   const [deliveryOrder, setDelivery] = useState(true);
  //   const [formInfo, setFormInfo] = useState({});
  //   const [errors, setErrors] = useState([]);

  //   function radioChange(e) {
  //     if (
  //       (deliveryOrder && e.target.value === "pickup" && e.target.checked) ||
  //       (!deliveryOrder && e.target.value === "delivery" && e.target.checked)
  //     ) {
  //       setDelivery(!deliveryOrder);
  //     }
  //   }

  //   function handleFormSubmit(e) {
  //     e.preventDefault();
  //     setErrors([]);
  //     let order;
  //     if (deliveryOrder) {
  //       let address = `${formInfo["address-1"]} ${formInfo["address-2"]} ${formInfo["city"]} ${formInfo["state"]} ${formInfo["zip"]}`;
  //       order = {
  //         userId: currUser.id,
  //         address: address,
  //         firstName: formInfo["first-name"],
  //         lastName: formInfo["last-name"],
  //         phone: formInfo["phone"],
  //         email: formInfo["email"],
  //         special_request: formInfo["special-instructions"],
  //         workforce: false,
  //       };
  //       console.log(order);
  //     }
  //     //send all or some fields to backend (depending on pickup or delivery)
  //     else {
  //       order = {
  //         userId: currUser.id,
  //         firstName: formInfo["first-name"],
  //         lastName: formInfo["last-name"],
  //         phone: formInfo["phone"],
  //         email: formInfo["email"],
  //         special_request: formInfo["special-instructions"],
  //         workforce: false,
  //       };
  //     }

  //     let orderCreated = dispatch(createOrder(order));
  //     if (orderCreated) {
  //       navigate("/order-submitted");
  //     }
  //   }

  //   return (
  //     <div className="pickup-delivery-page">
  //       <header className="pickup-deliery-header">
  //         <h1>Finalize your order</h1>
  //       </header>

  //       <div className="radio-button-container">
  //         <label htmlFor="delivery" className="delivery-radio">
  //           <input
  //             type="radio"
  //             id="delivery"
  //             name="pickup-or-delivery"
  //             value="delivery"
  //             defaultChecked
  //             onChange={radioChange}
  //           />
  //           <p>Delivery</p>
  //         </label>
  //         <label htmlFor="pickup">
  //           <input
  //             type="radio"
  //             id="pickup"
  //             name="pickup-or-delivery"
  //             value="pickup"
  //             onChange={radioChange}
  //           />
  //           Picked up at 9 Interstate Ave, Albany NY
  //         </label>
  //       </div>
  //       <form
  //         className={deliveryOrder ? "delivery-form" : "pickup-form"}
  //         onSubmit={handleFormSubmit}
  //       >
  //         {deliveryOrder ? (
  //           <DeliveryForm
  //             setFormInfo={setFormInfo}
  //             formInfo={formInfo}
  //             errors={errors}
  //           />
  //         ) : (
  //           <PickupForm setFormInfo={setFormInfo} formInfo={formInfo} />
  //         )}

  //         <footer>
  //           <p>Submit your order for {deliveryOrder ? "delivery." : "pickup."}</p>
  //           <input type="submit" value="Submit" />
  //         </footer>
  //       </form>
  //     </div>
  //   );
}

export default PickupAndDelivery;
