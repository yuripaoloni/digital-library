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
  libraries: [],
  books: [],
  pageUrl: "",
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
  async ({ book }) => {
    const notes = await getAllNotes({ book });
    //TODO const bookmarks = await getAllBookmarks({book});
    // return { notes: notes.data , bookmarks: bookmarks.data };
    return {
      notes: [
        {
          id: 15,
          book: {
            id: 11,
            title:
              "Annuario della libera Università degli studi di Camerino - Anno scolastico 1881-82",
            author: "Università di Camerino",
            pages: 130,
            library: {
              id: 0,
              name: "Biblioteca digitale unicam",
              url: "https://bibliotecadigitale.unicam.it",
              icon: "https://bibliotecadigitale.unicam.it/Images/Logo.ico",
            },
            remoteId: 1222,
            language: "italiano",
            year: 1882,
            genre: "B.G.1-6",
            plot: null,
          },
          page: 0,
          note: "test1",
        },
        {
          id: 16,
          book: {
            id: 11,
            title:
              "Annuario della libera Università degli studi di Camerino - Anno scolastico 1881-82",
            author: "Università di Camerino",
            pages: 130,
            library: {
              id: 0,
              name: "Biblioteca digitale unicam",
              url: "https://bibliotecadigitale.unicam.it",
              icon: "https://bibliotecadigitale.unicam.it/Images/Logo.ico",
            },
            remoteId: 1222,
            language: "italiano",
            year: 1882,
            genre: "B.G.1-6",
            plot: null,
          },
          page: 0,
          note: "test",
        },
        {
          id: 17,
          book: {
            id: 11,
            title:
              "Annuario della libera Università degli studi di Camerino - Anno scolastico 1881-82",
            author: "Università di Camerino",
            pages: 130,
            library: {
              id: 0,
              name: "Biblioteca digitale unicam",
              url: "https://bibliotecadigitale.unicam.it",
              icon: "https://bibliotecadigitale.unicam.it/Images/Logo.ico",
            },
            remoteId: 1222,
            language: "italiano",
            year: 1882,
            genre: "B.G.1-6",
            plot: null,
          },
          page: 1,
          note: "test",
        },
      ],
    };
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
    const res = await editNote({ book, id, note, page });
    return res.data;
  }
);

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
        state.libraries = action.payload;
      })
      .addCase(fetchLibraries.pending, (state) => {
        state.error = { error: false, variant: "error", message: "" };
      })
      .addCase(fetchBookPage.fulfilled, (state, action) => {
        state.loading = false;
        state.pageUrl = action.payload;
      })
      .addCase(fetchBookData.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes;
        // state.bookmarks = action.payload.bookmarks
      })
      .addCase(onDeleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = [
          ...state.notes.filter((note) => note.id !== action.payload),
        ];
      })
      .addCase(onCreateNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = [...state.notes.push(action.payload)];
      })
      .addCase(onEditNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = [
          ...state.notes.map((note) =>
            note.id === action.payload.id ? action.payload : note
          ),
        ];
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

export const { unsetError } = actions;

export default reducer;
