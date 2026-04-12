// src/lib/api.ts
import axios, { AxiosResponse, AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;

        // ONLY redirect if the user is NOT on a public page
        // Add any other public routes to this array
        const publicRoutes = ["/", "/login", "/register"];

        if (!publicRoutes.includes(path)) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);
