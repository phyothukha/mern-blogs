import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Alertslice {
  message?: string;
  color?: string;
  show?: boolean;
  setAlert: (message: string, color: string, show: boolean) => void;
}

export const useAlertSlice = create<Alertslice>()(
  devtools(
    persist(
      (set) => ({
        message: "",
        color: "primary",
        show: false,
        setAlert: (message, color, show) => set({ message, color, show }),
      }),
      { name: "alerttype" }
    )
  )
);
