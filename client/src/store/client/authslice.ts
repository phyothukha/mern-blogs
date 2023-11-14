import { create } from "zustand";
import { IAuthUser } from "../server/auth/interface";
import { devtools, persist } from "zustand/middleware";

export interface Iuser {
  access_token?: string;
  user?: IAuthUser | null;
}

interface AuthSlice {
  auth: Iuser | null;
  setAuth: (auth: Iuser) => void;
}

const initialAuth: Iuser = { access_token: "", user: null };

export const useAuthSlice = create<AuthSlice>()(
  devtools(
    persist(
      (set) => ({
        auth: initialAuth,
        setAuth: (auth) => set({ auth }),
      }),
      { name: "accesstoken" }
    )
  )
);
