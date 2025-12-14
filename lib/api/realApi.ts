import axios from "axios";

export const realApi = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});