// axiosInstance.js
import axios from "axios";
console.log({url:process.env.NEXT_PUBLIC_API_BASE_URL});
// "https://lms-server-bwyt.onrender.com"
const axiosInstance = axios.create({
  baseURL:"https://lms-server-bwyt.onrender.com",
   withCredentials: true, 
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

