import axios, { AxiosResponse, AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true, // CRITICAL: This sends the HttpOnly cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle global 401s (expired session)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Optional: Force redirect to /login if not already there
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
