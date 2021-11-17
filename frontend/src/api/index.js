import { axios } from "api/axios";
import { getMockBooks } from "mocks/models/Book";
import { getMockLibraries } from "mocks/models/Library";

export const getLibraries = () => {
  // return axios.get("/library/list");
  const data = { data: getMockLibraries(["MockA", "MockB"]) };
  return data;
};

export const getBooks = (title) => {
  const data = {
    data: getMockBooks([
      "TitleA",
      "TitleB",
      "TitleC",
      "TitleA",
      "TitleB",
      "TitleC",
      "TitleA",
      "TitleB",
      "TitleC",
    ]),
  };
  return data;
};
