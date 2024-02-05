// CSS
import "./OrderHistory.scss";

// Libaries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/order";
import { deleteBatchOrder, editNote } from "../../../store/BatchReducer";
import moment from "moment";

function OrderHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.allOrders);

  const [isFormVisible, setIsFormVisible] = useState({ id: null, toggle: false });
  const [noteContent, setNoteContent] = useState("")
  const [updateNote, setUpdateNote] = useState(false);
  const note = { note: noteContent }

  useEffect(() => {

    dispatch(getOrders());

  }, [dispatch]);


  const handleDeleteBatch = async (e, batchId) => {
    e.preventDefault()
    await dispatch(deleteBatchOrder(batchId))
  }

  const handleEditNote = async (batchId) => {
    await dispatch(editNote(batchId, note))
  }

  const handleSpecialRequest = (id) => {

    if (id !== isFormVisible.id) {
      setIsFormVisible({ id: null, toggle: false })
      setIsFormVisible({ id: id, toggle: true })
    } else {
      setIsFormVisible({ id: null, toggle: false })
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

        <p>{items.length} order(s)</p>

        {items.map((el) => {
          return (
            <div>
              <div className="setting__divider"></div>
              <div className="main__panel">
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
                        Processed: {el.processed ? "Complete" : "In Progress"}
                      </p>
                      <p>Order date: {moment(el.createdAt).format("l")}</p>
                    </div>
                  </div>
                  <div className="order-details_right">
                    <div className="order-shipping-info">
                      <h3>{el.delivery ? "Ship to: " : "Pick Up: "}{`${el.firstName} ${el.lastName}`}</h3>
                      <h3>Address: {el.address}</h3>
                    </div>
                    <div className="order-buttons">
                      <button aria-label="batch notes" onClick={() => {
                        setIsFormVisible({ id: el["Batches.id"], toggle: true })
                        handleSpecialRequest(el["Batches.id"])
                        setNoteContent(el["Batches.note"])
                        setUpdateNote(false)
                      }}>
                        CUSTOM TEXT
                      </button>
                      <button aria-label="delete batch" onClick={(e) => handleDeleteBatch(e, el["Batches.id"])} >CANCEL</button>
                    </div>
                  </div>
                </div>

                {isFormVisible.toggle && isFormVisible.id === el["Batches.id"] && (
                  // checking if processed is true/false
                  el.processed ?
                    <div className="note-description">
                      <h4>Notes:</h4>
                      <p>{el["Batches.note"]}</p>
                    </div>
                    :
                    // If edit button is clicked the editNote will turn true and into a form/input
                    updateNote ?
                      <div>
                        <h4 className="note-edit-form">Custom Text:</h4>
                        <form className="note-edit-form" onSubmit={(e) => {
                          e.preventDefault()
                          handleEditNote(el["Batches.id"])
                          setUpdateNote(false)
                        }}>
                          <textarea
                            id="edit-custom-text"
                            type="text"
                            value={noteContent}
                            onChange={(e) => {
                              setNoteContent(e.target.value)
                            }}
                          ></textarea>
                          <button type="submit">Submit</button>
                        </form>
                      </div>
                      :
                      // if editNote is false the edit button will be available
                      <div className="note-pre-edit">
                        <h4>Custom Text:</h4>
                        <p>{el["Batches.note"]}</p>
                        <button onClick={() => {
                          setUpdateNote(true)
                        }}>Edit</button>
                      </div>
                )}
              </div>
            </div>
          );
        })}
      </div >
    )
  );
}

export default OrderHistory;
