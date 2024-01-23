import { createSlice } from '@reduxjs/toolkit';
// A Testing Reducer
export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      value: 0,
    },
    reducers: {
      increment: state => {
        state.value += 1;
      },
      decrement: state => {
        state.value -= 1;
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload;
      },
    },
  });
  

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

// thunk action goes here 
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000); // Delay of 1 second
};