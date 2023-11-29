import { useQuery } from "@tanstack/react-query";
import { axios } from "..";

const refreshtoken = async () => {
  const logged = localStorage.getItem("logged");
  if (logged !== "phyrous") return;
  const res = await axios.get("/refresh_token");
  return res;
};

export const useRefreshtoken = () => {
  return useQuery({
    queryKey: ["refresh-token"],
    queryFn: refreshtoken,
    refetchOnWindowFocus: false,
  });
};

export const logout = async () => {
  localStorage.clear();

  const res = await axios.get("/logout");

  return res.data;
};
