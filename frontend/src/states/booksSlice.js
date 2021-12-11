import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getLibraries,
  getBooks,
  getRandomBooks,
  getBookCover,
  getBookPage,
  getAllNotes,
  deleteNote,
  createNote,
  editNote,
} from "api";

const initialState = {
  loading: false,
  singleBookLoading: false,
  noteLoading: false,
  libraries: [],
  books: [],
  selectedBook: null,
  pageUrl: null,
  notes: [],
  bookmarks: [],
  error: {
    error: false,
    variant: "error",
    message: "",
  },
};

export const fetchLibraries = createAsyncThunk("libraries/books", async () => {
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

export const fetchSingleBook = createAsyncThunk(
  "singleBook/books",
  async ({ title, libraryId }) => {
    let books = await getBooks(title, libraryId);
    let book = books.data[0][0];
    const cover = await getBookCover(book);
    book.image = cover.data;
    return book;
  }
);

export const fetchRandomBooks = createAsyncThunk("random/books", async () => {
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

export const fetchBookPage = createAsyncThunk(
  "page/books",
  async ({ book, page }) => {
    const res = await getBookPage({ book, page });
    return res.data;
  }
);

export const fetchBookData = createAsyncThunk(
  "data/books",
  async ({ book, page }) => {
    const pageUrl = await getBookPage({ book, page });
    const notes = await getAllNotes({ book });
    //TODO const bookmarks = await getAllBookmarks({book});
    return { pageUrl: pageUrl.data, notes: notes.data };

    // return { notes: notes.data , bookmarks: bookmarks.data };
  }
);

export const onDeleteNote = createAsyncThunk(
  "deleteNote/books",
  async ({ book, id, note, page }) => {
    await deleteNote({ book, id, note, page });
    return id;
  }
);

export const onCreateNote = createAsyncThunk(
  "createNote/books",
  async ({ book, note, page }) => {
    const res = await createNote({ book, note, page });
    return res.data;
  }
);

export const onEditNote = createAsyncThunk(
  "editNote/books",
  async ({ book, id, note, page }) => {
    await editNote({ book, id, note, page });
    return { book, id, note, page };
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    unsetError: (state) => {
      state.error = { error: false, variant: "error", message: "" };
    },
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibraries.fulfilled, (state, action) => {
        state.libraries = action.payload;
      })
      .addCase(fetchLibraries.pending, (state) => {
        state.error = { error: false, variant: "error", message: "" };
      })
      .addCase(fetchSingleBook.fulfilled, (state, action) => {
        state.singleBookLoading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchSingleBook.pending, (state) => {
        state.singleBookLoading = true;
        state.error = { error: false, variant: "error", message: "" };
      })
      .addCase(fetchBookPage.fulfilled, (state, action) => {
        state.loading = false;
        state.pageUrl = action.payload;
      })
      .addCase(fetchBookData.fulfilled, (state, action) => {
        state.loading = false;
        state.pageUrl = action.payload.pageUrl;
        state.notes = action.payload.notes;
        // state.bookmarks = action.payload.bookmarks
      })
      .addCase(onDeleteNote.fulfilled, (state, action) => {
        let updatedNotes = state.notes.filter(
          (note) => note.id !== action.payload
        );
        state.noteLoading = false;
        state.notes = [...updatedNotes];
      })
      .addCase(onCreateNote.fulfilled, (state, action) => {
        state.noteLoading = false;
        state.notes = [...state.notes, action.payload];
      })
      .addCase(onEditNote.fulfilled, (state, action) => {
        let updatedNotes = state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        );
        state.noteLoading = false;
        state.notes = [...updatedNotes];
      })
      .addMatcher(
        (action) =>
          action.type?.endsWith("random/books/fulfilled") ||
          action.type?.endsWith("books/books/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.books = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("Note/books/pending"),
        (state) => {
          state.noteLoading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("books/pending"),
        (state) => {
          state.loading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("books/rejected"),
        (state) => {
          state.loading = false;
          state.noteLoading = false;
          state.singleBookLoading = false;
          state.error.error = true;
          state.error.variant = "error";
          state.error.message = localStorage.getItem("authToken")
            ? "Errore durante il recupero dei dati. Prova di nuovo."
            : "Effettua nuovamente il login.";
        }
      );
  },
});

const { actions, reducer } = booksSlice;

export const { unsetError, selectBook } = actions;

export default reducer;
