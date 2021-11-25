import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "states/slices";

export const store = configureStore({
  reducer: { books: bookReducer },
});
