import axios from "axios";
import api from "../../config/api";
import { Historic } from "../models/historic.model";

export interface IGetCarInUseServiceResponse extends Historic {}

export const getCarInUseService =
  async (): Promise<IGetCarInUseServiceResponse | null> => {
    try {
      const response = await api.get<IGetCarInUseServiceResponse | null>(
        `/histories/get-car-in-use`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("headers:", error.request);
        throw new Error(error.response?.data?.message);
      }
      throw error;
    }
  };

export interface IGetHistoricByIdServiceResponse extends Historic {}

export const getHistoricByIdService = async (
  id: string
): Promise<IGetHistoricByIdServiceResponse> => {
  try {
    const response = await api.get<IGetHistoricByIdServiceResponse>(
      `/histories/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};
