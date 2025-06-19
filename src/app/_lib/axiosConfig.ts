// axiosInstance.js
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_API;

if (!baseURL) {
  throw new Error("API base URL is not defined in environment variables.");
}

if (process.env.NODE_ENV === "development") {
  console.log("Axios Base URL:", baseURL);
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
