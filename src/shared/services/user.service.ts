import axios from "axios";
import api from "../../config/api";

export interface IUpdateUserPhotoRequest {
  photo: string;
}

export interface IUpdateUserPhotoResponse {}

export const updateUserPhoto = async (
  data: IUpdateUserPhotoRequest
): Promise<IUpdateUserPhotoResponse> => {
  try {
    const response = await api.post<IUpdateUserPhotoResponse>(
      `/users/update-photo`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};
