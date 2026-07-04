import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationState {
  /** Ubicación/dirección de entrega elegida por el comprador. */
  location: string;
  setLocation: (value: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: "",
      setLocation: (value) => set({ location: value.trim() }),
      clearLocation: () => set({ location: "" }),
    }),
    { name: "delivery-location" }
  )
);
