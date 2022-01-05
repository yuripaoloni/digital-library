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
  let picture = image ? await getBase64(image) : image;

  return axios.post("/signup", {
    name,
    surname,
    username,
    email,
    password,
    picture,
  });
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

export const getPersonalNotes = ({ book }) => {
  return axios.post("/note/all", book, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const getSharedNotes = ({ book }) => {
  return axios.post("/note/all/shared", book, {
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

//? param could be username, email, name or surname
export const searchUser = (param) => {
  return axios.get("/user/search", {
    params: { query: param },
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const createGroup = (emails, name) => {
  return axios.post(
    "/group/create",
    { emails, name },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const getCreatedGroups = () => {
  return axios.get("/group/created", {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const deleteGroup = (id) => {
  return axios.delete(`/group/created/${id}`, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const editGroup = (id, emails, name) => {
  return axios.post(
    `/group/edit/${id}`,
    { emails, name },
    { headers: { Authorization: localStorage.getItem("authToken") } }
  );
};

export const removeUsersFromGroup = (emails, id) => {
  return axios({
    method: "delete",
    url: `/group/created/${id}/remove`,
    data: emails,
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const getJoinedGroups = () => {
  return axios.get("/group/joined", {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const leaveGroup = (id) => {
  return axios.delete(`/group/joined/${id}`, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const getSavedBooks = () => {
  return axios.get("/book/saved", {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const saveBook = (book) => {
  return axios.post(
    "/book/saved/add",
    {
      ...book,
    },
    {
      headers: { Authorization: localStorage.getItem("authToken") },
    }
  );
};

export const deleteBook = (book) => {
  //? added to load page images in frontend
  return axios({
    method: "delete",
    url: "/book/saved/delete",
    data: { ...book },
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const getGroupSharedNotes = (groupId) => {
  return axios.get(`/group/shared/${groupId}`, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};

export const shareNote = (groupId, noteId) => {
  return axios.post(
    `/group/share/${groupId}/${noteId}`,
    {},
    {
      headers: { Authorization: localStorage.getItem("authToken") },
    }
  );
};

export const unshareNote = (groupId, noteId) => {
  return axios.delete(`/group/share/${groupId}/${noteId}`, {
    headers: { Authorization: localStorage.getItem("authToken") },
  });
};
