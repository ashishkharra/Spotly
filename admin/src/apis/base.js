import axios from "axios";
import { userAuth } from "../store/store";

export const createApi = (baseURL) => {
  const api = axios.create({
    baseURL,
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const token = userAuth.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};
