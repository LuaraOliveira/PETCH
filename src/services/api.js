import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use((config) => {
  const token = Cookie.get(process.env.REACT_APP_COOKIE_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
