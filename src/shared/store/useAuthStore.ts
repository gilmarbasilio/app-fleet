import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id: string;
  name: string;
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
      name: "@meuapp:user",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
