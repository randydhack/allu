import { csrfFetch } from "../store/csrf";
import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from './order'
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
    updateBatch: (state, action) => {
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
    createNewBatch: (state, action) => {
      state.cart.push(action.payload)
    }
  },
});

// get all carts but only admin can use this
export const getCart = () => async (dispatch) => {
  const response = await csrfFetch("/api/cart");

  if (response.ok) {
    const cart = await response.json();
    dispatch(loadCart(cart));
    return cart
  }
};

// get a single batch
export const getBatch = (batchId) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/${batchId}`);

  if (response.ok) {
    const batch = await response.json();
    dispatch(loadSingleBatch(batch));
  }
};

// edit batch for sizes
export const editBatch = (batchId, batchData) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/${batchId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batchData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateBatch(data));
    dispatch(getCart());
  }
};

export const createBatch = ({productId, size, designId, color, total_price, product_url, note}) => async (dispatch) => {
  const res = await csrfFetch(`/api/batch`, {
    method: "POST",
    body: JSON.stringify({
      designId,
      productId,
      xs: size["XS"],
      s: size["S"],
      m: size["M"],
      l: size["L"],
      xl: size['XL'],
      xxl: size["2XL"],
      xxxl: size["3XL"],
      xxxxl: size["4XL"],
      xxxxxl: size["5XL"],
      color,
      total_price,
      product_url,
      note
    })
  })
  if (res.ok) {
    const data = await res.json()

    dispatch(createNewBatch(data))
    await dispatch(getCart());
    return data
  }
}

export const deleteBatch = (batchId) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/${batchId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(batchSlice.actions.deleteBatch(batchId));

    dispatch(getCart());
  }
};

/*THESE THUNKS ARE BEING CALLED WHEN THE BATCH BELONGS TO ORDERS*/

export const editNote = (batchId, batchData) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/note/${batchId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batchData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateBatch(data));
    dispatch(getOrders());
  }
};

export const deleteBatchOrder = (batchId) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/${batchId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(batchSlice.actions.deleteBatch(batchId));

    dispatch(getOrders());
  }
};

export const { loadCart, loadSingleBatch, updateBatch, createNewBatch } = batchSlice.actions;

export default batchSlice.reducer;
