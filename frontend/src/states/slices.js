import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLibraries, getBooks } from "api";

const initialState = {
  loading: true,
  libraries: [],
  books: [],
  selectedBook: {},
  error: {
    error: false,
    variant: "error",
    message: "",
  },
};

export const fetchLibraries = createAsyncThunk("books/libraries", async () => {
  const res = await getLibraries();
  return res.data;
});

export const fetchBooks = createAsyncThunk(
  "books/books",
  async ({ title, libraryId, page }) => {
    const res = await getBooks(title, libraryId, page);
    return res.data;
  }
);

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    unsetError: (state) => {
      state.error = { error: false, variant: "error", message: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraries.fulfilled, (state, action) => {
        state.loading = false;
        state.libraries = action.payload;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error.error = true;
          state.error.variant = "error";
          state.error.message =
            "Errore durante il recupero dei dati. Prova di nuovo.";
        }
      );
  },
});

export const { unsetError } = slice.actions;

export default slice.reducer;
