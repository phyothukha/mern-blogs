import { useMutation } from "@tanstack/react-query";
import { axios } from "..";
import { IuserLogin } from "./interface";
import { AxiosError } from "axios";
import { useAuthSlice } from "../../client/authslice";
import { useAlertSlice } from "../../client/alertslice";

const loginUser = async (user: IuserLogin) => {
  const response = await axios.post("/login", user, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const useLogin = () => {
  const { setAuth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  return useMutation({
    mutationFn: (user: IuserLogin) => loginUser(user),
    onSuccess: (data) => {
      const access_token = data.data.access_token;
      const user = data.data.user;
      setAuth({ access_token, user });
      setAlert(data.data.message, "success", true);
      // toast.success(data.data.message);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const errMsg =
          err.response?.status === 400
            ? err.response.data.message
            : "something went wrong!";
        setAlert(errMsg, "error", true);
        // toast.error(errMsg);
      }
    },
  });
};
