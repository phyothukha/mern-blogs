import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Iuser } from "../server/interface";

interface AuthSlice {
  auth: Iuser | null;
  setAuth: (auth: Iuser | null) => void;
}

const initialAuth: Iuser = { access_token: "", user: null };

export const useAuthSlice = create<AuthSlice>()(
  persist(
    devtools((set) => ({
      auth: initialAuth,
      setAuth: (auth) => set({ auth }),
    })),
    { name: "accesstoken" }
  )
);
