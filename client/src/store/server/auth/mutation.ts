import { useMutation } from "@tanstack/react-query";
import { axios } from "..";
import { IuserLogin, IuserRegiser } from "./interface";
import { AxiosError } from "axios";
import { useAuthSlice } from "../../client/authslice";
import { useAlertSlice } from "../../client/alertslice";

const loginUser = async (user: IuserLogin) => {
  const { data } = await axios.post("/login", user, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const useLogin = () => {
  const { setAuth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  return useMutation({
    mutationFn: (user: IuserLogin) => loginUser(user),
    onSuccess: (data) => {
      console.log(data);
      const access_token = data.access_token;
      const user = data.user;
      setAuth({ access_token, user });
      setAlert(data.message, "SUCCESS", true);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const errMsg =
          err.response?.status === 400
            ? err.response.data.message
            : "something went wrong!";
        setAlert(errMsg, "ERROR", true);
      }
    },
  });
};

const registeruser = async (user: IuserRegiser) => {
  const response = await axios.post("/register", user, {
    headers: { "Content-Type": "application/json" },
  });

  return response;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: IuserRegiser) => registeruser(user),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log(err);
      }
    },
  });
};
