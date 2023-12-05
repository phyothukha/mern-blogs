import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "..";
import { useAuthSlice } from "../../client/authslice";
import { useAlertSlice } from "../../client/alertslice";
import { AxiosError } from "axios";
import { IuserPayload, MutationProp } from "./interface";

const updateUser = async ({ token, payload }: MutationProp<IuserPayload>) => {
  const res = await axios.patch("/update-user", payload, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
export const useUpdateuser = () => {
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  return useMutation({
    mutationFn: (payload: IuserPayload) =>
      updateUser({
        token: auth?.access_token,
        payload,
      }),
    onSuccess: (data, variable) => {
      console.log(variable);
      setAuth({
        access_token: auth?.access_token,
        user: { ...auth?.user, name: variable.name, avatar: variable.avatar },
      });
      setAlert(data.message, "SUCCESS");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["refresh-token", auth?.access_token],
      });
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

interface resetPayload {
  token?: string;
  password: string;
}

const resetPassword = async ({ token, password }: resetPayload) => {
  const res = await axios.patch(
    "/reset-password",
    { password },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res;
};

export const useResetPassword = () => {
  const { auth } = useAuthSlice();
  return useMutation({
    mutationFn: (password: string) =>
      resetPassword({ token: auth?.access_token, password }),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
