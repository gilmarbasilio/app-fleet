import axios from "axios";
import queryString from "query-string";
import { Coords, Historic } from "../models/historicModel";
import api from "../config/api";

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
        throw new Error(error.response?.data?.message);
      }
      throw error;
    }
  };

export interface IGetHistoricByIdServiceResponse extends Historic {
  coords: Coords[];
}

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
  coords?: Coords[];
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

export interface ICheckOutHistoricServiceRequest {
  id: string;
  coords: Coords[];
}

export interface ICheckOutHistoricServiceResponse {}

export const checkOutHistoricService = async (
  data: ICheckOutHistoricServiceRequest
): Promise<ICheckOutHistoricServiceResponse> => {
  try {
    const response = await api.post<ICheckOutHistoricServiceResponse>(
      `/histories/check-out`,
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

export interface IGetCarInUseServiceRequest {
  skip?: number;
  take?: number;
  status?: "departed" | "arrived";
}

export interface IGetCarInUseServiceResponse extends Historic {}

export const getListHistoriesService = async (
  data: IGetCarInUseServiceRequest
): Promise<IGetCarInUseServiceResponse[]> => {
  try {
    const stringified = queryString.stringify(data);
    const response = await api.get<IGetCarInUseServiceResponse[]>(
      `/histories?${stringified}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    }
    throw error;
  }
};
