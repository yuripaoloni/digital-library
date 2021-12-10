import booksSlice from "states/booksSlice";
import authSlice from "states/authSlice";

test("booksSlice: should return the initial state", () => {
  expect(booksSlice(undefined, {})).toEqual({
    loading: false,
    noteLoading: false,
    libraries: [],
    books: [],
    pageUrl: null,
    notes: [],
    bookmarks: [],
    error: {
      error: false,
      variant: "error",
      message: "",
    },
  });
});

test("authSlice: should return the initial state", () => {
  expect(authSlice(undefined, {})).toEqual({
    loading: false,
    isAuth: false,
    isRegistered: false,
    error: {
      error: false,
      variant: "error",
      message: "",
    },
    authToken: localStorage.getItem("authToken"),
    user: {},
  });
});
