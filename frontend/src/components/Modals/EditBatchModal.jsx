import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context/modalContext";
import { editBatch } from "../../store/BatchReducer";
import { InfoContext } from "../../context/infoContext";

const EditBatchModal = () => {
  const { setIsModalOpen, setType } = useContext(ModalContext);
  const { batchDetails } = useContext(InfoContext);

  const dispatch = useDispatch();
  const getInitialSizes = () => {
    const sizes = {
      xs: batchDetails?.["Batches.xs"] || 0,
      s: batchDetails?.["Batches.s"] || 0,
      m: batchDetails?.["Batches.m"] || 0,
      l: batchDetails?.["Batches.l"] || 0,
      xl: batchDetails?.["Batches.xl"] || 0,
      xxl: batchDetails?.["Batches.xxl"] || 0,
      xxxl: batchDetails?.["Batches.xxxl"] || 0,
      xxxxl: batchDetails?.["Batches.xxxxl"] || 0,
      xxxxxl: batchDetails?.["Batches.xxxxxl"] || 0,
    };
    if (batchDetails["Batches.productId"] === 1) {
      delete sizes.xxxxl;
      delete sizes.xxxxxl;
    } else if (batchDetails["Batches.productId"] === 3) {
      delete sizes.xxxxxl;
    }
    return sizes;
  };

  const [sizes, setSizes] = useState(getInitialSizes());

  const handleChange = (e) => {
    setSizes({
      ...sizes,
      [e.target.name]: e.target.value ? parseInt(e.target.value, 10) : null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allSizesAreZero = Object.values(sizes).every(
      (size) => size === 0 || size === null
    );

    if (allSizesAreZero) {
      alert("You need at least one item. Please adjust the sizes.");
      return;
    }

    const payload = {
      ...Object.fromEntries(
        Object.entries(sizes).filter(
          ([key, value]) => value !== batchDetails[`Batches.${key}`]
        )
      ),
    };

    await dispatch(editBatch(batchDetails["Batches.id"], payload));
    setIsModalOpen(false);
    setType(null);
  };

  return (
    <div className="edit-batch-modal">
      <p className="edit-batch-title">EDIT QUANTITY</p>
      <form onSubmit={handleSubmit}>
        <div className="edit_form_container">
          {Object.keys(sizes).map((size) => (
            <div className="edit_column" key={size}>
              <div className="edit_label">
                <label htmlFor={size}>{size.toUpperCase()}</label>
              </div>

              <input
                type="number"
                id={size}
                name={size}
                aria-label="size"
                value={sizes[size] ?? ""}
                onChange={handleChange}
                min="0"
              />
            </div>
          ))}
        </div>

        <div className="edit_button">
          <button aria-label="update size" type="submit">
            Update Sizes
          </button>
        </div>
      </form>
      <div className="edit_button">
        <button
          aria-label="modal"
          onClick={() => {
            setIsModalOpen(false);
            setType(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditBatchModal;
