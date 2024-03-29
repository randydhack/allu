import { createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "../store/csrf";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoaded: false,
    allProducts: null,
    singleProduct: null,
    productColors: null,
    productSizes: null
  },
  reducers: {
    loadProducts: (state, action) => {
      state.isLoaded = true;
      state.allProducts = action.payload;
      state.productColors = {}
      state.productSizes = {}

      action.payload.forEach((product) => state.productColors[product.id] = product.colors)
      action.payload.forEach((product) => state.productSizes[product.id] = product.size)
    },
    loadSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
});

// Async thunk action for getting all products
export const getAllProducts = () => async (dispatch) => {
  const response = await csrfFetch("/api/products");

  if (response.ok) {
    const products = await response.json();
    dispatch(loadProducts(products));
    return products
  }
};

// Async thunk action for getting a single product
export const getProduct = (productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}`);

  if (response.ok) {
    const product = await response.json();
    dispatch(loadSingleProduct(product));
  }
};

export const { loadProducts, loadSingleProduct } = productSlice.actions;

export default productSlice.reducer;
