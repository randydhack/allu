// CSS
import "./OrderHistory.scss";

// Libaries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/order";
import moment from "moment";

function OrderHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.allOrders);

  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getOrders());
    })();
  }, [dispatch]);

  console.log(orders);

  return (
    orders && (
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
        {console.log(
          "dasdas",
          orders.map((el) => el.firstName)
        )}
        {orders.map((el, i) => {
          return (
            <div className="main__panel" key={`order${el.id}`}>
              <div className="order__detail">
                <div className="order__description">
                  <img
                    className="order__picture"
                    src={el["Batches.Design.design_url"]}
                  />
                  <div className="name_size">
                    <div className="name">
                      <p>{el["Batches.Product.name"]}</p>
                    </div>
                    <div className="size">
                      <p>
                        Sizes -{" "}
                        {el["Batches.xs"]
                          ? `xs${el["Batches.s"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.s"]
                          ? `s${el["Batches.m"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.m"]
                          ? `m${el["Batches.lg"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.lg"]
                          ? `lg${el["Batches.xl"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.xl"]
                          ? `xl${el["Batches.xxl"] ? "," : ""}`
                          : ""}
                        {el["Batches.xxl"]
                          ? `2xl${el["Batches.xxxl"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.xxxl"]
                          ? `3xl${el["Batches.xxxxl"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.xxxxl"]
                          ? `4xl${el["Batches.xxxxxlg"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.xxxxxl"] ? `5xl` : ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="delivery_stat">
                  <p>Order Placed</p>
                  <p>{moment(el.createdAt).format("MMMM Do, YYYY")}</p>
                </div>
              </div>
              <div className="delivery_detail">
                <div>
                  <p>Shipped To: {el.address}</p>
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
            </div>
          );
        })}
      </div>
    )
  );
}

export default OrderHistory;
