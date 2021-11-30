import { axios } from "api/axios";

export const getLibraries = () => {
  return axios.get("/library/list");
};

export const getBooks = (title, libraryId) => {
  let params = {
    query: title,
  };
  if (libraryId !== "all") params.libraryIds = libraryId;

  return axios.get("/book/search", { params });
};

export const getRandomBooks = () => {
  return axios.get("/book/random");
};

export const getBookCover = (book) => {
  return axios.post("/book/cover", book);
};

export const signIn = (email, password) => {
  return axios.post("/api/login", { email, password });
};

export const signUp = (name, surname, username, email, password) => {
  return axios.post("/api/signup", {
    name,
    surname,
    username,
    email,
    password,
  });
};
