import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/**
 * add interceptors if needed
 */

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 403) {
      localStorage.removeItem("authToken");
    }

    return Promise.reject(err);
  }
);
