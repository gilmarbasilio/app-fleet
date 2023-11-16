import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_STORAGE } from "./config.storage";

type StorageAuthTokenProps = {
  token: string;
};

export async function saveAuthTokenStorage({ token }: StorageAuthTokenProps) {
  await AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify({ token }));
}

export async function getAuthTokenStorage() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE);

  const { token }: StorageAuthTokenProps = response ? JSON.parse(response) : {};

  return { token };
}

export async function removeAuthTokenStorage() {
  await AsyncStorage.removeItem(AUTH_STORAGE);
}
