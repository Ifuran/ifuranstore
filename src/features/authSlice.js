import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    authUserSuccess: (state, action) => {
      (state.isLoading = false),
        (state.errorMessage = ""),
        (state.token = action.payload);
    },
    authUserLoading: (state, action) => {
      (state.errorMessage = ""), (state.isLoading = action.payload);
    },
    authUserError: (state, action) => {
      (state.errorMessage = action.payload), (state.isLoading = false);
    },
  },
});

export const { authUserSuccess, authUserLoading, authUserError } =
  authSlice.actions;

export default authSlice.reducer;

export function loginUser(credentials) {
  return async (dispatch, getState) => {
    dispatch(authUserLoading(true));
    if (!credentials.username || !credentials.password) {
      dispatch(authUserError("Username and Password are required!"));
    } else {
      try {
        const result = await axios.post(
          "https://fakestoreapi.com/auth/login",
          credentials
        );
        dispatch(authUserSuccess(result.data.token));
        localStorage.setItem("token", result.data.token);
      } catch (error) {
        dispatch(authUserError("Username or Password is incorrect"));
      }
    }
  };
}

export function logoutUser() {
  return async (dispatch, getState) => {
    try {
      dispatch(authUserSuccess(""));
      localStorage.removeItem("token");
    } catch (error) {
      dispatch(authUserError(error));
    }
  };
}

export function checkLoginUser() {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authUserSuccess(token));
      return;
    }
    return;
  };
}
