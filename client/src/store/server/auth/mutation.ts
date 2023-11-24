import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "..";
import { IAuthPayload, IuserLogin, IuserRegiser } from "./interface";
import { AxiosError } from "axios";
import { useAuthSlice } from "../../client/authslice";
import { useAlertSlice } from "../../client/alertslice";
import { useNavigate } from "react-router-dom";

const loginUser = async (user: IuserLogin) => {
  const res = await axios.post("/login", user, {
    headers: { "Content-Type": "application/json" },
  });

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
      console.log(data);
      const access_token = data.access_token;
      const user = data.user;
      localStorage.setItem("logged", "phyrous");
      queryClient.invalidateQueries({
        queryKey: ["refresh-token", access_token],
      });
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
  });
};

const registeruser = async (user: IuserRegiser) => {
  const response = await axios.post("/register", user, {
    headers: { "Content-Type": "application/json" },
  });

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
      if (err instanceof AxiosError) {
        setAlert(err.response?.data.message, "ERROR");
      }
    },
  });
};

const googleLogin = async (id_token: string) => {
  const res = await axios.post(
    "/google_login",
    { id_token },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertSlice();
  const { setAuth } = useAuthSlice();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id_token: string) => googleLogin(id_token),
    onSuccess: (data) => {
      console.log(data);
      const access_token = data.access_token;
      const user = data.user;
      localStorage.setItem("logged", "phyrous2");
      queryClient.invalidateQueries({
        queryKey: ["refresh-token", access_token],
      });
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
  });
};

const facebooklogin = async (accessToken: string, userID: string) => {
  const res = await axios.post(
    "/facebook_login",
    { accessToken, userID },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res);
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
      console.log(data);
      const access_token = data.access_token;
      const user = data.user;
      localStorage.setItem("logged", "phyrous2");
      queryClient.invalidateQueries({
        queryKey: ["refresh-token", access_token],
      });
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
  });
};
