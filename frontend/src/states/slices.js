import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    test: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { test } = counterSlice.actions;

export default counterSlice.reducer;
