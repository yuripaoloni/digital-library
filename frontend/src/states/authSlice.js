import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "api";

const initialState = {
  loading: false,
  isAuth: false,
  error: false,
  authToken: localStorage.getItem("authToken"),
  user: {}, //TODO se nel backend restituiscono qualcosa sull'utente dopo il login inserire in user
};

export const onSignIn = createAsyncThunk(
  "signIn/auth",
  async ({ email, password }) => {
    const res = await signIn(email, password);
    return res.headers.authorization;
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
      state.error = false;
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
        localStorage.setItem("authToken", action.payload);
        state.loading = false;
        state.isAuth = true;
        state.authToken = action.payload;
      })
      .addCase(onSignUp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type?.endsWith("auth/pending"),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("auth/rejected"),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      );
  },
});

const { actions, reducer } = authSlice;

export const { unsetError } = actions;

export default reducer;
