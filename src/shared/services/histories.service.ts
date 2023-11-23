import axios from "axios";
import api from "../../config/api";
import { Coords, Historic } from "../models/historic.model";

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

export interface ICreateHistoricServiceRequest {
  licensePlate: string;
  description: string;
  coords: Coords[];
}

export interface ICreateHistoricServiceResponse {}

export const createHistoricService = async (
  data: ICreateHistoricServiceRequest
): Promise<IGetHistoricByIdServiceResponse> => {
  try {
    const response = await api.post<IGetHistoricByIdServiceResponse>(
      `/histories`,
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
