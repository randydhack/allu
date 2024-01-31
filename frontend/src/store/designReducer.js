import { csrfFetch } from "../store/csrf";
import { createSlice } from "@reduxjs/toolkit";

export const designSlice = createSlice({
  name: "designs",
  initialState: {
    isLoaded: false,
    allDesigns: null,
    // singleDesign: null,
    userDesigns: null,
  },
  reducers: {
    loadDesigns: (state, action) => {
      state.isLoaded = true;
      state.allDesigns = action.payload;
    },
    singleDesign: (state, action) => {
      state.singleDesign = action.payload;
    },
  },
});

export const { loadDesigns, singleDesign } = designSlice.actions;

export default designSlice.reducer;

//get all designs
export const getDesigns = () => async (dispatch) => {
  const response = await fetch("/api/designs");

  if (response.ok) {
    const list = await response.json();
    dispatch(loadDesigns(list));
    return list;
  }
};

//single design
export const designDetails = (designId) => async (dispatch) => {
  const response = await fetch(`/api/designs/${designId}`);

  if (response.ok) {
    const design = await response.json();
    dispatch(singleDesign(design));
    return design;
  }
};

//create design
// export const createDesign = (design) => async (dispatch) => {
//   const response = await csrfFetch("/api/designs", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(design),
//   });

//   if (response.ok) {
//     const newDesign = await response.json();

//     dispatch(addDesign(newDesign));
//     return newDesign;
//   }
// };

//update design
// export const updateDesign = (design, id) => async (dispatch) => {
//   const response = await csrfFetch(`/api/designs/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(design),
//   });

//   if (response.ok) {
//     const edit = await response.json();
//     dispatch(editDesign(edit));
//     return edit;
//   }
// };

//delete design
// export const deleteDesign = (id) => async (dispatch) => {
//   const response = await csrfFetch(`/api/designs/${id}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     await response.json();
//     dispatch(removeDesign(id));
//   }
// };
