import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Alertslice {
  message: string;
  type: "SUCCESS" | "INFO" | "ERROR";
  show: boolean;
  setAlert: (
    message?: string,
    type?: "SUCCESS" | "INFO" | "ERROR",
    show?: boolean
  ) => void;
}

export const useAlertSlice = create<Alertslice>()(
  devtools(
    persist(
      (set) => ({
        message: "",
        type: "INFO",
        show: false,
        setAlert: (message, type, show = true) =>
          set((store) => {
            if (show) {
              setTimeout(() => {
                set((store) => ({ ...store, show: false }));
              }, 3000);
            }
            return { ...store, message, type, show };
          }),
      }),
      {
        name: "alertType",
      }
    )
  )
);
