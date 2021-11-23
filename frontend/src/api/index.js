import { axios } from "api/axios";
import { getMockBooks } from "mocks/models/Book";
import { getMockLibraries } from "mocks/models/Library";

export const getLibraries = () => {
  // return axios.get("/library/list");
  const data = { data: getMockLibraries(["MockA", "MockB"]) };
  return data;
};

export const getBooks = (title, libraryId, page) => {
  // let body = {};
  //TODO inserire params nella get

  // if (libraryId !== "all") body.libraryIds = [libraryId];
  // return axios.get("/book/search", {params: {}})
  const data = {
    data: [
      getMockBooks(["TitleA", "TitleB", "TitleC"]),
      getMockBooks(["TitleD", "TitleE", "TitleF"]),
      getMockBooks(["TitleG", "TitleH", "TitleI"]),
    ],
  };

  return data;
};
