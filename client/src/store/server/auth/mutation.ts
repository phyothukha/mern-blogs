import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "..";
import { AxiosError } from "axios";
import { useAuthSlice } from "../../client/authslice";
import { useAlertSlice } from "../../client/alertslice";
import { useNavigate } from "react-router-dom";
import {
  IAuthPayload,
  ISmsPayload,
  IuserLogin,
  IuserRegiser,
} from "../interface";

const loginUser = async (user: IuserLogin) => {
  const res = await axios.post("/login", user);
  return res.data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAuth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  return useMutation({
    mutationFn: (user: IuserLogin) => loginUser(user),
    onSuccess: (data: IAuthPayload) => {
      const access_token = data.access_token;
      const user = data.user;
      localStorage.setItem("logged", "phyrous");

      setAuth({ access_token, user });
      setAlert(data.message, "SUCCESS");
      navigate("/");
    },
    onError: (err) => {
      const errMsg =
        err instanceof AxiosError
          ? err.response?.data.message
          : "Something went wrong!";
      setAlert(errMsg, "ERROR");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["refresh-token"],
      });
    },
  });
};

const registeruser = async (user: IuserRegiser) => {
  const response = await axios.post("/register", user);
  return response.data;
};

export const useRegister = () => {
  const { setAlert } = useAlertSlice();
  return useMutation({
    mutationFn: (user: IuserRegiser) => registeruser(user),
    onSuccess: (data) => {
      setAlert(data.message, "SUCCESS");
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

const googleLogin = async (id_token: string) => {
  const res = await axios.post("/google_login", { id_token });
  return res.data;
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertSlice();
  const { setAuth } = useAuthSlice();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id_token: string) => googleLogin(id_token),
    onSuccess: (data: IAuthPayload) => {
      const access_token = data.access_token;
      const user = data.user;
      localStorage.setItem("logged", "phyrous");

      setAuth({ access_token, user });
      setAlert(data.message, "SUCCESS");
      navigate("/");
    },
    onError: (err) => {
      const errMsg =
        err instanceof AxiosError
          ? err.response?.data.message
          : "Something went wrong!";
      setAlert(errMsg, "ERROR");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["refresh-token"],
      });
    },
  });
};

const facebooklogin = async (accessToken: string, userID: string) => {
  const res = await axios.post("/facebook_login", { accessToken, userID });
  return res.data;
};

export const useFacebookLogin = () => {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertSlice();
  const { setAuth } = useAuthSlice();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      accessToken,
      userID,
    }: {
      accessToken: string;
      userID: string;
    }) => facebooklogin(accessToken, userID),
    onSuccess: (data) => {
      const access_token = data.access_token;
      const user = data.user;
      localStorage.setItem("logged", "phyrous");

      setAuth({ access_token, user });
      setAlert(data.message, "SUCCESS");
      navigate("/");
    },
    onError: (err) => {
      const errMsg =
        err instanceof AxiosError
          ? err.response?.data.message
          : "Something went wrong!";
      setAlert(errMsg, "ERROR");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["refresh-token"],
      });
    },
  });
};

const LoginSMS = async (payload: ISmsPayload) => {
  const res = await axios.post("/login_sms", payload);
  return res.data;
};

export const useLoginWithSms = () => {
  const navigate = useNavigate();
  const { setAlert } = useAlertSlice();

  return useMutation({
    mutationFn: (payload: ISmsPayload) => LoginSMS(payload),
    onSuccess: (_data, payload) => {
      setAlert("please Check your phone", "SUCCESS");
      navigate("/sms-verify", {
        state: payload,
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

const SmsVerify = async (payload: ISmsPayload) => {
  const res = await axios.post("/sms_verify", payload);
  return res.data;
};

export const useSmsVerify = () => {
  const { setAlert } = useAlertSlice();
  const { setAuth } = useAuthSlice();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ISmsPayload) => SmsVerify(payload),
    onSuccess: (data) => {
      const access_token = data.access_token;
      const user = data.user;
      localStorage.setItem("logged", "phyrous");

      setAuth({ access_token, user });
      setAlert(data.message, "SUCCESS");
      navigate("/");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const errMsg =
          err.response?.status === 400
            ? err.response.data.message
            : "something went wrong!";
        setAlert(errMsg, "ERROR");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["refresh-token"],
      });
    },
  });
};
