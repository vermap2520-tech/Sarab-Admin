
import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:5000",
    // baseURL: "https://sarab-backend-swart.vercel.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;


