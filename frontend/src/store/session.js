import { createSlice } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
      isAuth: false,
      user: null
    },
    reducers: {
      login: (state, action) => {
        state.isAuth = true;
        state.user = action.payload
      }
    }
});

export const { login } = sessionSlice.actions;

export default sessionSlice.reducer;

// POST - Login with email and password
export const loginUser = (credential, password) => async (dispatch) => {

  console.log(credential, password)
    // Make API request to authenticate user (login)
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential,
        password,
      }),
    });

    if (response) {
      const data = await response.json();
      // Dispatch the loginSuccess action with the user data

      console.log(data)
      dispatch(login(data.user));
      return data
    }
};
