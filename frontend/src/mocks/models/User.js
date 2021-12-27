import { getMockBooks } from "./Book";

export const getMockUser = (name) => {
  return {
    name: name ? name : "MockName",
    surname: "MockSurname",
    email: "MockEmail",
    picture: null,
    username: "MockUsername",
    savedBooks: getMockBooks(["MockSavedBook1", "MockSavedBook2"]),
  };
};
