import { create } from "zustand";

type Store = {
  cityInput?: string;
  cities: string[];
  coords: {
    latitude?: number;
    longitude?: number;
  };
  setCityInput: (cityInput?: string) => void;
  setCities: (cities: string[]) => void;
  setCoords: (coords: { latitude?: number; longitude?: number }) => void;
  removeCity: (target: string) => void;
  removeUserLocation: () => void;
};

export const useStore = create<Store>((set) => ({
  cityInput: undefined,
  setCityInput: (input: string | undefined) => set({ cityInput: input }),

  cities: [],
  setCities: (cities: string[]) => set({ cities }),

  coords: {},
  setCoords: (newCoords: { latitude?: number; longitude?: number }) =>
    set({ coords: newCoords }),

  removeCity: (target: string) =>
    set((state) => ({
      cities: state.cities.filter((city) => city !== target),
    })),
  removeUserLocation: () => set({ coords: {} }),
}));
