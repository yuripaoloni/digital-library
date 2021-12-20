import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "states/booksSlice";
import authReducer from "states/authSlice";
import groupsReducer from "states/groupsSlice";

export const store = configureStore({
  reducer: { books: booksReducer, auth: authReducer, groups: groupsReducer },
});
