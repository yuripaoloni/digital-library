import { getMockBooks } from "./Book";

export const getMockUser = () => {
  return {
    name: "MockName",
    surname: "MockSurname",
    email: "MockEmail",
    username: "MockUsername",
    savedBooks: getMockBooks(["MockSavedBooks"]),
  };
};
