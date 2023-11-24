import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { USER_STORAGE } from "../storage/config.storage";

type User = {
  id: string;
  name: string;
  photo: string;
};

type AuthStore = {
  user?: User;
  token?: string;
  setUser: (user?: User) => void;
  setToken: (token?: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: undefined,
      token: undefined,
      setUser: (user) => set((state) => ({ ...state, user })),
      setToken: (token) => set((state) => ({ ...state, token })),
    }),
    {
      name: USER_STORAGE,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
