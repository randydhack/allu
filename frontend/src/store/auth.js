import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
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

export const { login } = authSlice.actions;

export default authSlice.reducer;

// POST - Login with email and password
export const loginUser = (credential, password) => async (dispatch) => {
  try {
    // Make API request to authenticate user (login)
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential, password),
    });

    const data = await response.json();
    // Dispatch the loginSuccess action with the user data
    dispatch(loginSuccess(data.user));

  } catch (error) {
    console.error('Error logging in:', error);
    // Handle login errors as needed
  }
};
