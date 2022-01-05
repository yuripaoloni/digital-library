import { getMockBooks } from "./Book";

export const getMockUser = (name, undefinedUsername) => {
  return {
    name: name ? name : "MockName",
    surname: "MockSurname",
    email: "MockEmail",
    picture: null,
    username: undefinedUsername ? undefined : "MockUsername",
    savedBooks: getMockBooks(["MockSavedBook1", "MockSavedBook2"]),
  };
};
