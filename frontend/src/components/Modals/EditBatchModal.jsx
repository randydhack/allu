import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context/modalContext";
import { editBatch } from "../../store/BatchReducer";
import { InfoContext } from "../../context/infoContext";

const EditBatchModal = () => {
  const { setIsModalOpen, setType } = useContext(ModalContext);
  const { batchDetails } = useContext(InfoContext);
  console.log(batchDetails);
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState({
    xs: batchDetails?.xs || 0,
    s: batchDetails?.s || 0,
    m: batchDetails?.m || 0,
    l: batchDetails?.l || 0,
    xl: batchDetails?.xl || 0,
    xxl: batchDetails?.xxl || 0,
    xxxl: batchDetails?.xxxl || 0,
    xxxxl: batchDetails?.xxxxl || 0,
    xxxxxl: batchDetails?.xxxxxl || 0,
  });

  const handleChange = (e) => {
    setSizes({
      ...sizes,
      [e.target.name]: e.target.value ? parseInt(e.target.value, 10) : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      ["Batches.productId"]: productId,
      ["Batches.color"]: color,
      ["Batches.total_price"]: total_price,
    } = batchDetails;
    const allSizesAreZero = Object.values(sizes).every((size) => size === 0);

    if (allSizesAreZero) {
      alert("You need at least one item. Please adjust the sizes.");
      return;
    }

    const payload = {
      productId,
      color,
      total_price,
      ...Object.fromEntries(
        Object.entries(sizes).filter(
          ([key, value]) => value !== batchDetails[`Batches.${key}`]
        )
      ),
    };

    await dispatch(editBatch(batchDetails.id, payload));
    setIsModalOpen(false);
    setType(null);
  };

  return (
    <div className="edit-batch-modal">
      <form onSubmit={handleSubmit}>
        {Object.keys(sizes).map((size) => (
          <div key={size}>
            <label htmlFor={size}>{size.toUpperCase()}</label>
            <input
              type="number"
              id={size}
              name={size}
              value={sizes[size] ?? ""}
              onChange={handleChange}
              min="0"
            />
          </div>
        ))}
        <button type="submit">Update Sizes</button>
      </form>
      <button
        onClick={() => {
          setIsModalOpen(false);
          setType(null);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditBatchModal;
