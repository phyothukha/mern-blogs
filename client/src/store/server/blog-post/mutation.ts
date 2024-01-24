import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authHeader, axios } from "..";
// import { useAuthSlice } from "../../client/authslice";
import { MutationProp } from "../interface";
import { Iblog } from "./interface";
import { useNavigate } from "react-router-dom";
import { useAlertSlice } from "../../client/alertslice";
import { AxiosError } from "axios";

const createBlog = async ({ payload }: MutationProp<Iblog>) => {
  const res = await axios.post(
    "/create/blog",
    { ...payload },
    {
      headers: authHeader(),
    }
  );
  return res.data;
};

export const useCreateBlog = () => {
  // const { auth } = useAuthSlice();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAlert } = useAlertSlice();

  return useMutation({
    mutationFn: (payload: Iblog) => createBlog({ payload }),
    onSuccess: (data) => {
      console.log(data);
      setAlert(data.message, "SUCCESS");
    },
    onSettled: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
    },
    onError: (err) => {
      const errMsg =
        err instanceof AxiosError
          ? err.response?.data.message
          : "Something went wrong!";
      setAlert(errMsg, "ERROR");
    },
  });
};
