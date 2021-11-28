import reducer from "states/booksSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    loading: false,
    libraries: [],
    books: [],
    error: {
      error: false,
      variant: "error",
      message: "",
    },
  });
});
