import { useMutation } from "@tanstack/react-query";
import { axios } from "..";
import { useAuthSlice } from "../../client/authslice";
import { Iblog, MutationProp } from "../interface";

const createBlog = async ({ token, payload }: MutationProp<Iblog>) => {
  const res = await axios.post(
    "/create/blog",
    { ...payload },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data;
};

export const useCreateBlog = () => {
  const { auth } = useAuthSlice();

  return useMutation({
    mutationFn: (payload: Iblog) =>
      createBlog({ token: auth?.access_token, payload }),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
