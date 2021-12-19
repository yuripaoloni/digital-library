import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchUser, signIn, signUp } from "api";

const initialState = {
  loading: false,
  userLoading: false,
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
  async ({ name, surname, username, email, password, image }) => {
    const res = await signUp(name, surname, username, email, password, image);
    return res.data;
  }
);

export const onSearchUser = createAsyncThunk(
  "searchUser/user",
  async ({ param }) => {
    console.log("execute", param);
    const res = await searchUser(param);
    return res.data[0];
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
      localStorage.removeItem("username");
      state.authToken = null;
      state.isAuth = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onSignIn.fulfilled, (state, action) => {
        localStorage.setItem("authToken", action.payload.authToken);
        localStorage.setItem("username", action.payload.user.username);
        state.isAuth = true;
        state.authToken = action.payload.authToken;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(onSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addCase(onSearchUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addMatcher(
        (action) => action.type?.endsWith("user/pending"),
        (state) => {
          state.userLoading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )

      .addMatcher(
        (action) => action.type?.endsWith("auth/pending"),
        (state) => {
          state.loading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )
      .addMatcher(
        (action) =>
          action.type?.endsWith("auth/rejected") ||
          action.type?.endsWith("user/rejected"),
        (state) => {
          state.loading = false;
          state.userLoading = false;
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
