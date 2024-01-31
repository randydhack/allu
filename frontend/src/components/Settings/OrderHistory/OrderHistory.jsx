import "./OrderHistory.scss";
// CSS

// Libaries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/order";

function OrderHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.allOrders);

  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getOrders());
    })();
  }, [dispatch]);

  console.log(orders)

  return (
    <div className="setting__contents setting__background">
      {/* HEADING */}
      <div className="setting__header__mb">
        <h2 className="setting__header">Order History</h2>
        <hr className="setting__divider"></hr>
      </div>
      <div className="status">
        <p>Fulfilled</p>
        <p>In Progress</p>
      </div>
      {orders && (
        <div>
          {orders.map((el, i) => {
            <div className="main__panel">
              <div className="order__detail">
                <div className="order__description">
                  <div className="order__picture"></div>
                  <div className="name_size">
                    <div className="name">
                      <p>Name of the Product</p>
                    </div>
                    <div className="size">
                      <p>Sizes - Medium</p>
                    </div>
                  </div>
                </div>
                <div className="delivery_stat">
                  <p>Order Placed</p>
                  <p>Date</p>
                </div>
              </div>
              <div className="delivery_detail">
                <div>
                  <p>
                    Shiped To: Address Part 2 <br /> Address Part 2
                  </p>
                </div>

                <div className="request_btn">
                  <button
                    onClick={() => setFormVisible(!isFormVisible)}
                    className={isFormVisible ? "button-dark" : ""}
                  >
                    special request
                  </button>
                  <button>cancel order</button>
                </div>
              </div>
              {isFormVisible && (
                <form className="special-request-form">
                  <p>Special Request</p>
                  <textarea placeholder="Enter your special request"></textarea>
                  <button type="submit">Send Request</button>
                </form>
              )}
            </div>;
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
