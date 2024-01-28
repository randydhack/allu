import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import sessionReducer from './session';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: process.env.NODE_ENV === 'production' ? ['YOUR_ACTION_TYPE'] : [],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});
