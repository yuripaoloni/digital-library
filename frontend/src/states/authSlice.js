import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteBook,
  getSavedBooks,
  saveBook,
  searchUser,
  signIn,
  signUp,
  passwordRecovery,
  resetPassword,
} from "api";

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
  isFavorite: false,
  passwordReset: false,
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
    const user = await searchUser(param);
    const savedBooks = await getSavedBooks();
    return { ...user.data[0], savedBooks: savedBooks.data };
  }
);

export const onSaveBook = createAsyncThunk(
  "saveBook/user",
  async ({ book }) => {
    await saveBook(book);
    return book;
  }
);

export const onDeleteBook = createAsyncThunk(
  "deleteBook/user",
  async ({ book }) => {
    await deleteBook(book);
    return book.id;
  }
);

export const onPasswordRecovery = createAsyncThunk(
  "passwordRecovery/auth",
  async ({ email, redirect }) => {
    await passwordRecovery(email, redirect);
  }
);

export const onResetPassword = createAsyncThunk(
  "resetPassword/auth",
  async ({ password, resetToken }) => {
    await resetPassword(password, resetToken);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    unsetError: (state) => {
      state.error = { error: false, variant: "error", message: "" };
    },
    setError: (state, action) => {
      state.error = { error: true, variant: "error", message: action.payload };
    },
    onSignOut: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      state.authToken = null;
      state.isAuth = false;
      state.user = {};
    },
    isFavoriteBook: (state, action) => {
      state.isFavorite = state.user?.savedBooks
        ? state.user.savedBooks.some((book) => {
            return (
              book.title.trim() === action.payload.title.trim() &&
              book.library.id.toString() === action.payload.libraryId
            );
          })
        : false;
    },
  },

  //? deleteBook and addBook pending and rejected state are not handled since they do not need a UI update
  extraReducers: (builder) => {
    builder
      .addCase(onSignIn.fulfilled, (state, action) => {
        localStorage.setItem("authToken", action.payload.authToken);
        localStorage.setItem("username", action.payload.user.username);
        state.isAuth = true;
        state.authToken = action.payload.authToken;
        state.user = action.payload.user;
        state.loading = false;
        state.userLoading = false;
        state.isRegistered = false;
      })
      .addCase(onSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.userLoading = false;
        state.isRegistered = true;
      })
      .addCase(onSearchUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(onSaveBook.fulfilled, (state, action) => {
        state.user.savedBooks = [...state.user.savedBooks, action.payload];
        state.isFavorite = true;
      })
      .addCase(onDeleteBook.fulfilled, (state, action) => {
        let updatedBooks = state.user.savedBooks.filter(
          (book) => book.id !== action.payload
        );
        state.user.savedBooks = [...updatedBooks];
        state.isFavorite = false;
      })
      .addCase(onPasswordRecovery.fulfilled, (state) => {
        state.loading = false;
        state.userLoading = false;
        state.error.error = true;
        state.error.variant = "success";
        state.error.message =
          "Email inviata. Segui le istruzioni nella mail per cambiare la password";
      })
      .addCase(onResetPassword.fulfilled, (state) => {
        state.loading = false;
        state.userLoading = false;
        state.passwordReset = true;
        state.error.error = true;
        state.error.variant = "success";
        state.error.message = "Password cambiata con successo";
      })
      .addCase(onSearchUser.pending, (state) => {
        state.userLoading = true;
        state.error = { error: false, variant: "error", message: "" };
      })
      .addCase(onSignIn.rejected, (state) => {
        state.loading = false;
        state.userLoading = false;
        state.error.error = true;
        state.error.variant = "error";
        state.error.message = "Credenziali errate";
      })
      .addCase(onSignUp.rejected, (state) => {
        state.loading = false;
        state.userLoading = false;
        state.error.error = true;
        state.error.variant = "error";
        state.error.message =
          "Errore nei dati di registrazione. Prova di nuovo.";
      })
      .addCase(onPasswordRecovery.rejected, (state) => {
        state.loading = false;
        state.userLoading = false;
        state.error.error = true;
        state.error.variant = "error";
        state.error.message = "Errore nell'invio della mail. Prova di nuovo.";
      })
      .addCase(onResetPassword.rejected, (state) => {
        state.loading = false;
        state.userLoading = false;
        state.error.error = true;
        state.error.variant = "error";
        state.error.message =
          "Errore nel cambio della password. Prova di nuovo.";
      })
      .addCase(onSearchUser.rejected, (state) => {
        state.loading = false;
        state.userLoading = false;
        state.error.error = true;
        state.error.variant = "error";
        state.error.message = localStorage.getItem("authToken")
          ? "Errore durante il recupero dei dati. Prova di nuovo."
          : "Effettua nuovamente il login.";
      })
      .addMatcher(
        (action) => action.type?.endsWith("auth/pending"),
        (state) => {
          state.loading = true;
          state.passwordReset = false;
          state.error = { error: false, variant: "error", message: "" };
        }
      );
  },
});

const { actions, reducer } = authSlice;

export const { unsetError, setError, onSignOut, isFavoriteBook } = actions;

export default reducer;
