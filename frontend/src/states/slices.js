import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLibraries } from "api";

const initialState = {
  loading: false,
  libraries: [],
};

export const fetchLibraries = createAsyncThunk("global/libraries", async () => {
  const res = await getLibraries();
  return res.data;
});

const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    test: () => {},
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchLibraries.fulfilled, (state, action) => {
        state.loading = false;
        state.libraries = action.payload;
      })
      .addCase(fetchLibraries.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLibraries.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { test } = slice.actions;

export default slice.reducer;
