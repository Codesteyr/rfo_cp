import axios from "axios";
import { useStateContext } from "../src/contexts/ContextProvider";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    // пользователь является не авторизованным
    // или токен недействительный\ его нет
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
    } else if (response.status === 404) {
      // другие случаи когда 404 (пока не будем)
      //Show not found
    }

    throw error;
  }
);

export default axiosClient;
