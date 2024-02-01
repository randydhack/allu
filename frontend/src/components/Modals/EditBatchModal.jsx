import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context/modalContext";
import { editBatch } from "../../store/BatchReducer";

const EditBatchModal = ({ batchId }) => {
  const { setIsModalOpen } = useContext(ModalContext);
  const dispatch = useDispatch();

  // Initialize sizes with null or an existing batch's sizes
  const [sizes, setSizes] = useState({
    xs: null,
    s: null,
    m: null,
    l: null,
    xl: null,
    xxl: null,
    xxxl: null,
    xxxxl: null,
    xxxxxl: null,
  });

  const handleChange = (e) => {
    setSizes({
      ...sizes,
      [e.target.name]: e.target.value ? parseInt(e.target.value, 10) : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure to only send sizes that are not null
    const updatedSizes = Object.entries(sizes).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    await dispatch(editBatch(batchId, updatedSizes));
    setIsModalOpen(false);
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
      <button onClick={() => setIsModalOpen(false)}>Cancel</button>
    </div>
  );
};

export default EditBatchModal;
