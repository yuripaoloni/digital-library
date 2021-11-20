import { axios } from "api/axios";
import { getMockBooks } from "mocks/models/Book";
import { getMockLibraries } from "mocks/models/Library";

export const getLibraries = () => {
  // return axios.get("/library/list");
  const data = { data: getMockLibraries(["MockA", "MockB"]) };
  return data;
};

export const getBooks = (title, libraryId) => {
  // let body = {};

  // if (libraryId) body.libraryIds = [libraryId];
  // return axios.get("/book/search", body)
  const data = {
    data: [
      getMockBooks(["TitleA", "TitleB", "TitleC"]),
      getMockBooks(["TitleD", "TitleE", "TitleF"]),
      getMockBooks(["TitleG", "TitleH", "TitleI"]),
    ],
  };

  return data;
};
