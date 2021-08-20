import axios from "axios";

const api = axios.create({
  baseURL: "https://petch-teste.herokuapp.com",
});

export default api;
