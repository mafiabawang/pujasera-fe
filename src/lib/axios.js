import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://13.211.234.24:3000",
});