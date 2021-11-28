import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "states/booksSlice";

export const store = configureStore({
  reducer: { books: bookReducer },
});
