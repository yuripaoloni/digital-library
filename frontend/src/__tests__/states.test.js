import booksSlice from "states/booksSlice";
import authSlice from "states/authSlice";
import groupsSlice from "states/groupsSlice";

test("booksSlice: should return the initial state", () => {
  expect(booksSlice(undefined, {})).toEqual({
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
  });
});

test("authSlice: should return the initial state", () => {
  expect(authSlice(undefined, {})).toEqual({
    loading: false,
    userLoading: false,
    isAuth: localStorage.getItem("authToken") ? true : false,
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

test("groupsSlice: should return the initial state", () => {
  expect(groupsSlice(undefined, {})).toEqual({
    loading: false,
    joinedGroups: [],
    createdGroups: [],
    error: false,
  });
});
