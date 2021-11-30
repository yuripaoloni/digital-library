import Axios from "axios";

//? the proxy value in package.json is used to avoid CORS issues
export const axios = Axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  auth: localStorage.getItem("authToken"),
});

/**
 * add interceptors if needed
 */
