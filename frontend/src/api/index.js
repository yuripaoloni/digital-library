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
  return axios.post("/login", { email, password });
};

export const signUp = (name, surname, username, email, password) => {
  return axios.post("/signup", {
    name,
    surname,
    username,
    email,
    password,
  });
};

export const getBookPage = ({ book, page }) => {
  return axios.post(
    "/book/page",
    { book, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const createNote = ({ book, note, page }) => {
  return axios.post(
    "/note/add",
    { book, note, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const editNote = ({ book, id, note, page }) => {
  return axios.post(
    "/note/edit",
    { book, id, note, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const getAllNotes = ({ book }) => {
  return axios.post("/note/all", book, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const getNoteByPage = ({ book, page }) => {
  return axios.post(
    "/note/page",
    { book, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const deleteNote = ({ book, id, note, page }) => {
  return axios({
    method: "delete",
    url: "/note/delete",
    headers: { Authorization: localStorage.getItem("authToken") },
    data: { book, id, note, page },
  });
};

export const createBookmark = ({ book, description, page }) => {
  return axios.post(
    "/bookmark/add",
    { book, description, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const editBookmark = ({ book, id, description, page }) => {
  return axios.post(
    "/bookmark/edit",
    { book, id, description, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const getAllBookmarks = ({ book }) => {
  return axios.post("/bookmark/all", book, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const deleteBookmark = ({ book, id, description, page }) => {
  return axios({
    method: "delete",
    url: "/bookmark/delete",
    headers: { Authorization: localStorage.getItem("authToken") },
    data: { book, id, description, page },
  });
};
