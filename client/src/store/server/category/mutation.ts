import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authHeader, axios } from "..";
// import { useAuthSlice } from "../../client/authslice";
import { useAlertSlice } from "../../client/alertslice";
import { AxiosError } from "axios";
import { ICategory, MutationProp, createCategoryPayload } from "../interface";

const createCategory = async ({ name }: createCategoryPayload) => {
  const res = await axios.post(
    "/category",
    { name },
    { headers: authHeader() }
  );
  return res.data;
};

export const useCreateCategory = () => {
  // const { auth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createCategory({ name }),
    onSuccess: (data) => {
      setAlert(data.message, "SUCCESS");
    },
    onSettled: () => {
      queryclient.invalidateQueries({ queryKey: ["get-category"] });
    },
    onError: (err) => {
      const errMsg =
        err instanceof AxiosError
          ? err.response?.data.message
          : "something went wrong!";

      setAlert(errMsg, "ERROR");
    },
  });
};

const updateCategory = async ({ payload }: MutationProp<ICategory>) => {
  const res = await axios.patch(
    `/category/${payload._id}`,
    { name: payload.name },
    {
      headers: authHeader(),
    }
  );
  return res.data;
};

export const useUpdateCategory = () => {
  // const { auth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICategory) =>
      updateCategory({
        // token: auth?.access_token,
        payload: { ...payload, name: payload.name },
      }),

    onSuccess: (data) => {
      setAlert(data.message, "SUCCESS");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
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

const deleteCategory = async ({ payload }: MutationProp<ICategory>) => {
  const res = await axios.delete(`/category/${payload._id}`, {
    headers: authHeader(),
  });
  return res.data;
};

export const useDeleteCategory = () => {
  // const { auth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICategory) => deleteCategory({ payload }),

    onSuccess: (data) => {
      setAlert(data.message, "SUCCESS");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
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
