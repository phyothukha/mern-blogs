import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "..";
// import { ICategory, MutationProp, createCategoryPayload } from "./interface";
import { useAuthSlice } from "../../client/authslice";
import { useAlertSlice } from "../../client/alertslice";
import { AxiosError } from "axios";
import { ICategory, MutationProp, createCategoryPayload } from "../interface";

const createCategory = async ({ token, name }: createCategoryPayload) => {
  const res = await axios.post(
    "/category",
    { name },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return res.data;
};

export const useCreateCategory = () => {
  const { auth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) =>
      createCategory({ token: auth?.access_token, name }),
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

const updateCategory = async ({ token, payload }: MutationProp<ICategory>) => {
  const res = await axios.patch(
    `/category/${payload._id}`,
    { name: payload.name },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data;
};

export const useUpdateCategory = () => {
  const { auth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICategory) =>
      updateCategory({
        token: auth?.access_token,
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

const deleteCategory = async ({ token, payload }: MutationProp<ICategory>) => {
  const res = await axios.delete(`/category/${payload._id}`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

export const useDeleteCategory = () => {
  const { auth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICategory) =>
      deleteCategory({ token: auth?.access_token, payload }),

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
