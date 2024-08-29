import axios from "axios";
// const api = axios.create({ baseURL: "https://backend.bookstore.crow.uz/api" });
const api = axios.create({ baseURL: "http://localhost:5100/api" });
export default api;