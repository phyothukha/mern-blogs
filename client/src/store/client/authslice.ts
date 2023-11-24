import { create } from "zustand";
import { IAuthUser } from "../server/auth/interface";
import { devtools, persist } from "zustand/middleware";

export interface Iuser {
  access_token?: string;
  user?: IAuthUser | null;
}

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
