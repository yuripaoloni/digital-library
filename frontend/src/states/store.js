import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "states/booksSlice";
import authReducer from "states/authSlice";

export const store = configureStore({
  reducer: { books: bookReducer, auth: authReducer },
});
