import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type LocationProps = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

type LocationStore = {
  location: LocationProps[];
  setLocation: (location: LocationProps) => void;
  resetLocation: () => void;
};

export const useLocationStore = create<LocationStore>()(
  persist(
    (set, get) => ({
      location: [],
      setLocation: (location) =>
        set((state) => ({
          location: [...state.location, location],
        })),
      resetLocation: () => set((state) => ({ ...state, location: [] })),
    }),
    {
      name: "@meuapp:location",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
