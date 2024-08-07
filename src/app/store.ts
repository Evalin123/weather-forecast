import { create } from "zustand";

type Store = {
  cities: string[];
  coords: {
    latitude?: number;
    longitude?: number;
  };
  setCities: (cities: string[]) => void;
  setCoords: (coords: { latitude?: number; longitude?: number }) => void;
  removeCity: (target: string) => void;
  removeUserLocation: () => void;
};

export const useStore = create<Store>((set) => ({
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
