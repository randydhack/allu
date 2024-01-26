import { createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isAuth: false,
    user: null,
  },
  // After created a reducer, export it below
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    restoreSession: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    signup: (state, action) => {
      state.isAuth = true;
      state.user = action.payload
    }
  },
});

export const { login, restoreSession, signup } = sessionSlice.actions;

export default sessionSlice.reducer;

// POST - Login with email and password
export const loginUser = (credential, password) => async (dispatch) => {
  // Make API request to authenticate user (login)
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  // Dispatch the loginSuccess action with the user data
  if (response) {
    const data = await response.json();
    dispatch(login(data.user));
    return data;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");

  if (response.ok) {
    const data = await response.json();
    dispatch(restoreSession(data.user));
    return response;
  }
};

export const registerUser =
  (email, firstName, lastName, password) => async (dispatch) => {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json()
      dispatch(signup(data.user))
      return data
    }
  };
