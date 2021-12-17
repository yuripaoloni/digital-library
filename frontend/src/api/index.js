import { axios } from "api/axios";
import getBase64 from "utils/getBase64";

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

export const signUp = async (
  name,
  surname,
  username,
  email,
  password,
  image
) => {
  const base64 = await getBase64(image);

  return axios.post(
    "/signup",
    {
      name,
      surname,
      username,
      email,
      password,
      image: base64,
    },
    { headers: { "Content-type": "multipart/form-data" } }
  );
};

export const getBookPage = ({ book, page }) => {
  return axios.post(
    "/book/page",
    { book, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const createNote = ({ book, title, description, page }) => {
  return axios.post(
    "/note/add",
    { book, title, description, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const editNote = ({ id, title, description }) => {
  return axios.post(
    "/note/edit",
    { id, title, description },
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

export const deleteNote = ({ id }) => {
  return axios.delete(`/note/delete/${id}`, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const createBookmark = ({ book, description, page }) => {
  return axios.post(
    "/bookmark/add",
    { book, description, page },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const editBookmark = ({ id, description }) => {
  return axios.post(
    "/bookmark/edit",
    { id, description },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const getAllBookmarks = ({ book }) => {
  return axios.post("/bookmark/all", book, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const deleteBookmark = ({ id }) => {
  return axios.delete(`/bookmark/delete/${id}`, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};
