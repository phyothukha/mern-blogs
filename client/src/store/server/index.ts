import Axios from "axios";
import { useAuthSlice } from "../client/authslice";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const authHeader = () => ({
  ContentType: "Application/json",
  Authorization: `${useAuthSlice.getState().auth?.access_token}`,
});
