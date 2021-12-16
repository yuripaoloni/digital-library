import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "api";

const initialState = {
  loading: false,
  isAuth: localStorage.getItem("authToken") ? true : false,
  isRegistered: false,
  error: {
    error: false,
    variant: "error",
    message: "",
  },
  authToken: localStorage.getItem("authToken"),
  user: {},
};

export const onSignIn = createAsyncThunk(
  "signIn/auth",
  async ({ email, password }) => {
    const res = await signIn(email, password);
    return { authToken: res.headers.authorization, user: res.data };
  }
);

export const onSignUp = createAsyncThunk(
  "signUp/auth",
  async ({ name, surname, username, email, password }) => {
    const res = await signUp(name, surname, username, email, password);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    unsetError: (state) => {
      state.error = { error: false, variant: "error", message: "" };
    },
    onSignOut: (state) => {
      localStorage.removeItem("authToken");
      state.authToken = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onSignIn.fulfilled, (state, action) => {
        localStorage.setItem("authToken", action.payload.authToken);
        state.isAuth = true;
        state.authToken = action.payload.authToken;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(onSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addMatcher(
        (action) => action.type?.endsWith("auth/pending"),
        (state) => {
          state.loading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("auth/rejected"),
        (state) => {
          state.loading = false;
          state.error = {
            error: true,
            variant: "error",
            message: "Errore nella richiesta. Prova di nuovo.",
          };
        }
      );
  },
});

const { actions, reducer } = authSlice;

export const { unsetError, onSignOut } = actions;

export default reducer;
