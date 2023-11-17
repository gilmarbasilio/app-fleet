import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "../shared/store/useAuthStore";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export default api;

export const addAccessTokenOnRequest = async (
  _api: AxiosInstance
): Promise<void> => {
  const token = useAuthStore((state) => state.token);
  _api.defaults.headers.Authorization = `Bearer ${token}`;
};
