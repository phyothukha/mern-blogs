import { useQuery } from "@tanstack/react-query";
import { axios } from "..";
import { IAuthUser } from "../interface";

const getUser = async (id: string): Promise<IAuthUser> => {
  const res = await axios.get(`/get-user/${id}`);

  console.log(res);
  return res.data;
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["get-user", id],
    queryFn: () => getUser(id),
    refetchOnWindowFocus: false,
  });
};
