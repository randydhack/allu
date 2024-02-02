import { csrfFetch } from "../store/csrf";
import { createSlice } from "@reduxjs/toolkit";

export const batchSlice = createSlice({
  name: "batches",
  initialState: {
    isLoaded: false,
    cart: [],
    singleBatch: null,
  },
  reducers: {
    loadCart: (state, action) => {
      state.isLoaded = true;
      state.cart = action.payload;
    },
    loadSingleBatch: (state, action) => {
      state.singleBatch = action.payload;
    },
    editBatch: (state, action) => {
      state.cart = state.cart.map((batch) =>
        batch.id === action.payload.id ? action.payload : batch
      );
      if (state.singleBatch?.id === action.payload.id) {
        state.singleBatch = action.payload;
      }
    },
    deleteBatch: (state, action) => {
      state.cart = state.cart.filter((batch) => batch.id !== action.payload);

      if (state.singleBatch?.id === action.payload) {
        state.singleBatch = null;
      }
    },
  },
});

export const getCart = () => async (dispatch) => {
  const response = await csrfFetch("/api/cart");

  if (response.ok) {
    const cart = await response.json();
    dispatch(loadCart(cart));
  }
};

export const getBatch = (batchId) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/${batchId}`);

  if (response.ok) {
    const batch = await response.json();
    dispatch(loadSingleBatch(batch));
  }
};

export const editBatch = (batchId, batchData) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/${batchId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batchData),
  });

  if (response.ok) {
    const updatedBatch = await response.json();
    dispatch(loadSingleBatch(updatedBatch));
    dispatch(getCart());
  }
};

export const deleteBatch = (batchId) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/${batchId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(batchSlice.actions.deleteBatch(batchId));

    dispatch(getCart());
  }
};
export const { loadCart, loadSingleBatch } = batchSlice.actions;

export default batchSlice.reducer;
