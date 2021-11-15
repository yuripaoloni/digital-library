import { configureStore } from "@reduxjs/toolkit";

import reducer from "states/slices";

export const store = configureStore({
  reducer: { reducer },
});
