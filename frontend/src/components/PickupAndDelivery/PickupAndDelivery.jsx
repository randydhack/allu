import PickupForm from "./PickupForm";
import DeliveryForm from "./DeliveryForm";
import { useEffect, useState } from "react";
import { createOrder } from "../../store/order";
import { useDispatch } from "react-redux";
// import { useContext } from "react"
import { useSelector } from "react-redux";

import "./PickupAndDelivery.scss";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../store/BatchReducer";
import emailjs from "emailjs-com";

function PickupAndDelivery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);

  const [isDelivery, setIsDelivery] = useState(true);
  const [formInfo, setFormInfo] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const cart = await dispatch(getCart());
      const filterCart = cart.filter((el) => el["Batches.id"] !== null);
      if (!filterCart.length) {
        return navigate("/checkout");
      } else {
        setLoaded(true);
      }
    })();
  }, [dispatch]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    let order;
    if (isDelivery) {
      let address = `${formInfo["address1"]} ${formInfo["address2"] || ""} ${
        formInfo["city"]
      }, ${formInfo["state"]} ${formInfo["zipCode"]}`;
      order = {
        userId: currUser.id,
        address: address,
        firstName: formInfo["firstName"],
        lastName: formInfo["lastName"],
        phone: formInfo["phone"],
        email: formInfo["email"],
        special_request: formInfo["special-request"],
        quote: 0,
        workforce_race: false,
        processed: false,
        delivery: true,
      };
    } else {
      order = {
        userId: currUser.id,
        address: "9 Interstate Ave Albany, NY 12205",
        firstName: formInfo["firstName"],
        lastName: formInfo["lastName"],
        phone: formInfo["phone"],
        email: formInfo["email"],
        special_request: formInfo["special-request"] || "",
        quote: 0,
        workforce_race: false,
        processed: false,
        delivery: false,
      };
    }
    const emailData = {
      from_name: formInfo["firstName"] + " " + formInfo["lastName"],
      message: formInfo["special-request"],
      reply_to: formInfo["email"],
      address: isDelivery
        ? `${formInfo["address1"]} ${formInfo["address2"] || ""} ${
            formInfo["city"]
          }, ${formInfo["state"]} ${formInfo["zipCode"]}`
        : "9 Interstate Ave Albany, NY 12205",
      phone: formInfo["phone"],
    };

    try {
      const emailResponse = await emailjs.send(
        "service_z6xyat9",
        "template_jl5btlf",
        emailData,
        "qX2bG7gix8uM5rrzg"
      );
      console.log(
        "Email successfully sent!",
        emailResponse.status,
        emailResponse.text
      );

      let orderCreated = await dispatch(createOrder(order));
      if (orderCreated) {
        return navigate(`/order-submitted/${orderCreated.id}`);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }

  function formChange(e) {
    let currentFormInfo = { ...formInfo };
    currentFormInfo[e.target.name] = e.target.value;
    setFormInfo(currentFormInfo);
  }

  return (
    isLoaded && (
      <div className="pickup-delivery-page">
        <div style={{ height: "100%" }}>
          <header>
            <h1>FINALIZE YOUR ORDER</h1>
          </header>

          <div className="checkout_options">
            <p style={{ marginRight: "25px" }}>Checkout Options:</p>
            <div className="radio-button-container">
              <div className="radio-option" style={{ width: "fit-content" }}>
                <input
                  type="radio"
                  id="delivery"
                  aria-label="delivery"
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
                  aria-label="delivery"
                  value={false}
                  name="pickup-or-delivery"
                  onChange={() => setIsDelivery(false)}
                />
                <p>Pick up at 9 Interstate Ave Albany, NY 12205</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="checkout-form-main">
            {isDelivery ? (
              <DeliveryForm
                setFormInfo={setFormInfo}
                formInfo={formInfo}
                formChange={formChange}
              />
            ) : (
              <PickupForm
                setFormInfo={setFormInfo}
                formInfo={formInfo}
                formChange={formChange}
              />
            )}

            <div className="special-request-form">
              <label htmlFor="special-request">Additional Information</label>
              <textarea
                name="special-request"
                id="special-request"
                cols="30"
                rows="10"
                aria-label="special request"
                placeholder="Any additional information about the order or special request."
                onChange={formChange}
                value={formInfo["special-request"] || ""}
              />
            </div>

            <div className="submit-order-main">
              <p>
                Submitting this will finalize your order and be reviewed before
                shipping.
              </p>
              <button type="submit" aria-label="submit">
                Submit Order
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default PickupAndDelivery;
