import Axios from "axios";

//? the proxy value in package.json is used to avoid CORS issues
export const axios = Axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
});

/**
 * add interceptors if needed
 */
