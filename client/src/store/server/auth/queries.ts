import { useQuery } from "@tanstack/react-query";
import { axios } from "..";
import { useAuthSlice } from "../../client/authslice";

const refreshtoken = async () => {
  const logged = localStorage.getItem("logged");
  if (logged !== "phyrous") return;
  const res = await axios.get("/refresh_token");
  return res.data;
};

export const useRefreshtoken = () => {
  const { auth } = useAuthSlice();
  return useQuery({
    queryKey: ["refresh-token", auth?.access_token],
    queryFn: refreshtoken,
    refetchOnWindowFocus: false,
    enabled: !!auth?.access_token,
  });
};

export const logout = async () => {
  localStorage.clear();
  const res = await axios.get("/logout");

  return res.data;
};
