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
  const response = await api.post<ILoginServiceResponse>(`/auth/login`, data);
  return response.data;
};
