import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const api: AxiosInstance = axios.create({
  baseURL: "https://6710442ba85f4164ef2d7e2a.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    window.location.href = "/";
  }
  return Promise.reject(error);
});

export default api;
