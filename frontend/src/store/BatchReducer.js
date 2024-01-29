import { csrfFetch } from "../store/csrf";
import { createSlice } from "@reduxjs/toolkit";

export const batchSlice = createSlice({
  name: "batches",
  initialState: {
    isLoaded: false,
    allBatches: null,
    singleBatch: null,
  },
  reducers: {
    loadBatches: (state, action) => {
      state.isLoaded = true;
      state.allBatches = action.payload;
    },
    loadSingleBatch: (state, action) => {
      state.singleBatch = action.payload;
    },
    editBatch: (state, action) => {
      state.allBatches = state.allBatches.map((batch) =>
        batch.id === action.payload.id ? action.payload : batch
      );
      if (state.singleBatch?.id === action.payload.id) {
        state.singleBatch = action.payload;
      }
    },
    deleteBatch: (state, action) => {
      state.allBatches = state.allBatches.filter(
        (batch) => batch.id !== action.payload
      );

      if (state.singleBatch?.id === action.payload) {
        state.singleBatch = null;
      }
    },
  },
});

export const getAllBatches = () => async (dispatch) => {
  const response = await csrfFetch("/api/batch");

  if (response.ok) {
    const batches = await response.json();
    dispatch(loadBatches(batches));
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
    dispatch(loadSingleBatch(updatedBatch)); // or your update logic here
  }
};

// Thunk for deleting a batch
export const deleteBatch = (batchId) => async (dispatch) => {
  const response = await csrfFetch(`/api/batch/${batchId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(loadSingleBatch(null)); // Clear the deleted batch
    // You might also want to refresh the list of all batches
    // if they are displayed in the UI
  }
};

export const { loadBatches, loadSingleBatch } = batchSlice.actions;

export default batchSlice.reducer;
