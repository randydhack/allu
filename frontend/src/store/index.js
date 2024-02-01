import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import sessionReducer from "./session";
import designReducer from "./designReducer";
import orderReducer from "./order";
import BatchReducer from "./BatchReducer";
import ProductReducer from "./ProductReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    session: sessionReducer,
    designs: designReducer,
    orders: orderReducer,
    batches: BatchReducer,
    products: ProductReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions:
          process.env.NODE_ENV === "production" ? ["YOUR_ACTION_TYPE"] : [],
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
});
