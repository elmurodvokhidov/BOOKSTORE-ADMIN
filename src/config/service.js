import api from "./api";
import Cookies from "js-cookie";

// interceptor
api.interceptors.request.use((req) => {
    const token = Cookies.get("token");
    if (token) req.headers.Authorization = token;
    return req;
});

const service = {
    // auth
    async loginAuth(auth) {
        const response = await api.post('/auth/signin', auth);
        return response;
    },
    async getAuth() {
        const response = await api.get('/auth');
        return response;
    },
    async getAllUser() {
        const response = await api.get('/auth/users');
        return response;
    },

    // books
    async getAllBooks(nomi, cat) {
        const response = await api.get(`/books?nomi=${nomi}&cat=${cat}`);
        return response;
    },

    // categories
    async getAllCategory() {
        const response = await api.get("/category");
        return response;
    },
};

export default service;