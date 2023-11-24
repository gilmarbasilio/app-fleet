import axios from "axios";
import api from "../../config/api";

export interface ILoginServiceRequest {
  email: string;
  password: string;
}

export interface ILoginServiceResponse {
  token: string;
}

export const loginService = async (
  data: ILoginServiceRequest
): Promise<ILoginServiceResponse> => {
  try {
    const response = await api.post<ILoginServiceResponse>(`/auth/login`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};

export interface IRegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterServiceResponse {}

export const registerService = async (
  data: IRegisterServiceRequest
): Promise<IRegisterServiceResponse> => {
  try {
    const response = await api.post<IRegisterServiceResponse>(`/users`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};

export interface IUserLoggedServiceResponse {
  id: string;
  name: string;
  email: string;
  photo: string;
}

export const getUserLoggedService =
  async (): Promise<IUserLoggedServiceResponse> => {
    try {
      const response = await api.get<IUserLoggedServiceResponse>(`/auth/me`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message);
      }
      throw error;
    }
  };
