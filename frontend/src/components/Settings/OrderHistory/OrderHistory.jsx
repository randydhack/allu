// CSS
import "./OrderHistory.scss";

// Libaries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/order";
import { deleteBatchOrder } from "../../../store/BatchReducer";
import moment from "moment";

function OrderHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.allOrders);

  const [isFormVisible, setIsFormVisible] = useState({id: null, toggle: false});

  useEffect(() => {
    (async () => {
      await dispatch(getOrders());
    })();
  }, [dispatch]);

  const handleDeleteBatch = async(e, batchId) => {
    e.preventDefault()
    dispatch(deleteBatchOrder(batchId))
  }

  const handleSpecialRequest = (id) => {
    
    if (id !== isFormVisible.id) {
      setIsFormVisible({id: null, toggle: false})
      setIsFormVisible({id: id, toggle: true})
    } else {
      setIsFormVisible({id: null, toggle: false})
    }
  };

  const items = orders?.filter(el => el["Batches.id"] !== null)

  return (
    items && (
      <div className="setting__contents setting__background">
        {/* HEADING */}
        <div className="setting__header__mb">
          <h1 className="setting__header">Order History</h1>
        </div>
        {/* {console.log(
          "dasdas",
          orders.map((el) => el.firstName)
        )} */}

        <p>{items.length} order(s)</p>

        {items.map((el, i) => {
          return (
            <>
            <div className="setting__divider"></div>
              <div className="main__panel" key={`order${el.id}`}>
                <div className="order">
                  <div className="order_detail_main">
                    <img
                      src={el["Batches.Design.design_url"]}
                      className="order_design_image"
                      alt={`Premade design with id ${el["Batches.Design.id"]}`}
                    />
                    <div className="order_details">
                      <h3>{el["Batches.Product.name"]}</h3>
                      <p>
                        Sizes:{" "}
                        {el["Batches.xs"]
                          ? `XS${el["Batches.s"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.s"]
                          ? `S${el["Batches.m"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.m"]
                          ? `M${el["Batches.lg"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.lg"]
                          ? `L${el["Batches.xl"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.xl"]
                          ? `XL${el["Batches.xxl"] ? "," : ""}`
                          : ""}
                        {el["Batches.xxl"]
                          ? `2XL${el["Batches.xxxl"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.xxxl"]
                          ? `3XL${el["Batches.xxxxl"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.xxxxl"]
                          ? `4XL${el["Batches.xxxxxlg"] ? "," : ""}`
                          : ""}{" "}
                        {el["Batches.xxxxxl"] ? `5XL` : ""}
                      </p>
                      <p>Color: {el["Batches.color"]}</p>
                      <p>
                        Process: {el.processed ? "Complete" : "In Progress"}
                      </p>
                      <p>Order date: {moment(el.createdAt).format("l")}</p>
                    </div>
                  </div>
                  <div className="order-details_right">
                    <div className="order-shipping-info">
                      <h3>Ship To: {`${el.firstName} ${el.lastName}`}</h3>
                      <h3>Address: {el.address}</h3>
                    </div>
                    <div className="order-buttons">
                      <button aria-label="batch notes" onClick={() => {
                        setIsFormVisible({id: el["Batches.id"], toggle: true})
                        handleSpecialRequest(el["Batches.id"])}}>
                        NOTES
                      </button>
                      <button aria-label="delete batch" onClick={(e) => handleDeleteBatch(e, el["Batches.id"])} >CANCEL</button>
                    </div>
                  </div>
                </div>

                {isFormVisible.toggle && isFormVisible.id === el["Batches.id"] && (
                  <form className="special-request-form">
                    <p>Notes</p>
                    {/* <textarea placeholder="Enter your special request" ></textarea> */}
                    <p>{el["Batches.note"]}</p>
                    {console.log(el["Batches.note"])}
                    {/* <button type="submit">Submit Request</button> */}
                  </form>
                )}

                {/* <div className="delivery_detail">
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
              </div> */}
              </div>
            </>
          );
        })}
      </div>
    )
  );
}

export default OrderHistory;
