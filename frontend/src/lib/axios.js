import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://orbit-lq87.onrender.com",
    withCredentials: true,
})