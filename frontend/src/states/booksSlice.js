import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getLibraries,
  getBooks,
  getRandomBooks,
  getBookPage,
  getAllNotes,
  deleteNote,
  createNote,
  editNote,
  getAllBookmarks,
  deleteBookmark,
  createBookmark,
  editBookmark,
} from "api";

const initialState = {
  loading: false,
  singleBookLoading: false,
  noteLoading: false,
  bookmarkLoading: false,
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
    return res.data;
  }
);

export const fetchSingleBook = createAsyncThunk(
  "singleBook/books",
  async ({ title, libraryId, page = null }) => {
    let books = await getBooks(title, libraryId);
    let book = books.data[0][0];
    if (page) {
      const pageUrl = await getBookPage({ book, page });
      const notes = await getAllNotes({ book });
      const bookmarks = await getAllBookmarks({ book });
      return {
        book: book,
        pageUrl: pageUrl.data,
        notes: notes.data,
        bookmarks: bookmarks.data,
      };
    }

    return { book: book };
  }
);

export const fetchRandomBooks = createAsyncThunk("random/books", async () => {
  const res = await getRandomBooks();
  return res.data;
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
    const bookmarks = await getAllBookmarks({ book });
    return {
      pageUrl: pageUrl.data,
      notes: notes.data,
      bookmarks: bookmarks.data,
    };
  }
);

export const onDeleteNote = createAsyncThunk(
  "deleteNote/books/notes",
  async ({ id }) => {
    await deleteNote({ id });
    return id;
  }
);

export const onCreateNote = createAsyncThunk(
  "createNote/books/notes",
  async ({ book, title, description, page }) => {
    const res = await createNote({ book, title, description, page });
    return res.data;
  }
);

export const onEditNote = createAsyncThunk(
  "editNote/books/notes",
  async ({ book, id, title, description, timestamp, page }) => {
    await editNote({ id, title, description });
    return { book, id, title, description, timestamp, page };
  }
);

export const onDeleteBookmark = createAsyncThunk(
  "deleteBookmark/books/bookmarks",
  async ({ id }) => {
    await deleteBookmark({ id });
    return id;
  }
);

export const onCreateBookmark = createAsyncThunk(
  "createBookmark/books/bookmarks",
  async ({ book, description, page }) => {
    const res = await createBookmark({ book, description, page });
    return res.data;
  }
);

export const onEditBookmark = createAsyncThunk(
  "editBookmark/books/bookmarks",
  async ({ book, id, description, page }) => {
    await editBookmark({ id, description });
    return { book, id, description, page };
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    unsetError: (state) => {
      state.error = { error: false, variant: "error", message: "" };
    },
    setError: (state, action) => {
      state.error = {
        error: true,
        variant: "error",
        message: action.payload,
      };
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
        state.selectedBook = action.payload.book;
        state.pageUrl = action.payload?.pageUrl;
        state.notes = action.payload?.notes;
        state.bookmarks = action.payload?.bookmarks;
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
        state.bookmarks = action.payload.bookmarks;
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
      .addCase(onDeleteBookmark.fulfilled, (state, action) => {
        let updatedBookmarks = state.bookmarks.filter(
          (note) => note.id !== action.payload
        );
        state.bookmarkLoading = false;
        state.bookmarks = [...updatedBookmarks];
      })
      .addCase(onCreateBookmark.fulfilled, (state, action) => {
        state.bookmarkLoading = false;
        state.bookmarks = [...state.bookmarks, action.payload];
      })
      .addCase(onEditBookmark.fulfilled, (state, action) => {
        let updatedBookmarks = state.bookmarks.map((note) =>
          note.id === action.payload.id ? action.payload : note
        );
        state.bookmarkLoading = false;
        state.bookmarks = [...updatedBookmarks];
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
        (action) => action.type?.endsWith("/books/notes/pending"),
        (state) => {
          state.noteLoading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("/books/bookmarks/pending"),
        (state) => {
          state.bookmarkLoading = true;
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
        (action) =>
          action.type?.endsWith("books/rejected") ||
          action.type?.endsWith("books/notes/rejected") ||
          action.type?.endsWith("books/bookmarks/rejected"),
        (state) => {
          state.loading = false;
          state.noteLoading = false;
          state.bookmarkLoading = false;
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

export const { unsetError, selectBook, setError } = actions;

export default reducer;
