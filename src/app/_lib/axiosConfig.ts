// axiosInstance.js
import axios from "axios";
console.log({url:process.env.NEXT_PUBLIC_API_BASE_URL});

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
   withCredentials: true, 
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

