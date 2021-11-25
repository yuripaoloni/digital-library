import reducer from "states/slices";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    loading: false,
    libraries: [],
  });
});
