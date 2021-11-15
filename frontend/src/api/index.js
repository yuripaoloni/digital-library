import { axios } from "api/axios";

export const getData = () => {
  return axios.get("endpoint");
};
