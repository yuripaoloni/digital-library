import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signinSlice";
import bookReducer from "states/booksSlice";

export const store = configureStore({
  reducer: { books: bookReducer, signin: signinReducer },
});
