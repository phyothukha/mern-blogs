import { useQuery } from "@tanstack/react-query";
import { axios } from "..";
import { ICategory } from "../interface";

const getCategory = async () => {
  const res = await axios.get("/category");
  return res.data.Category;
};

export const useGetCategory = () => {
  return useQuery<ICategory[]>({
    queryKey: ["get-category"],
    queryFn: () => getCategory(),
  });
};
