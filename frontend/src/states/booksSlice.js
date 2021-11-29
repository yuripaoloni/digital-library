import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLibraries, getBooks, getRandomBooks, getBookCover } from "api";

const initialState = {
  loading: false,
  libraries: [],
  books: [],
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
  async ({ title, libraryId }) => {
    let res = await getBooks(title, libraryId);
    let books = res.data;
    for (const booksPage of books) {
      for (const book of booksPage) {
        const res = await getBookCover(book);
        book.image = res.data;
      }
    }
    return books;
  }
);

export const fetchRandomBooks = createAsyncThunk("books/random", async () => {
  const res = await getRandomBooks();
  let books = res.data;
  for (const booksPage of books) {
    for (const book of booksPage) {
      const res = await getBookCover(book);
      book.image = res.data;
    }
  }
  return books;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    unsetError: (state) => {
      state.error = { error: false, variant: "error", message: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraries.fulfilled, (state, action) => {
        // state.loading = false;
        state.libraries = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type?.endsWith("random/fulfilled") ||
          action.type?.endsWith("books/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.books = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("/rejected"),
        (state) => {
          state.loading = false;
          state.error.error = true;
          state.error.variant = "error";
          state.error.message =
            "Errore durante il recupero dei dati. Prova di nuovo.";
        }
      );
  },
});

const { actions, reducer } = booksSlice;

export const { unsetError } = actions;

export default reducer;
