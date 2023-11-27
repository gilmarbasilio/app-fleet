import AsyncStorage from "@react-native-async-storage/async-storage";

import { StorageValue } from "zustand/middleware";
import { USER_STORAGE } from "../constants/storageConstants";

type StorageAuthTokenProps = {
  token: string;
};

export async function getAuthTokenStorage(): Promise<string> {
  const response = await AsyncStorage.getItem(USER_STORAGE);

  const data: StorageValue<StorageAuthTokenProps> = response
    ? JSON.parse(response)
    : {};

  return data?.state?.token;
}
