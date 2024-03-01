import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authHeader, axios } from "..";
import { IComment } from "./interface";
import { useAlertSlice } from "../../client/alertslice";
import { AxiosError } from "axios";

const createComment = async (payload: IComment) => {
  const res = await axios.post("/create/comment", payload, {
    headers: authHeader(),
  });
  return res.data;
};

export const useCreateComment = () => {
  const { setAlert } = useAlertSlice();
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IComment) => createComment(payload),
    onSuccess: (data) => {
      setAlert(data.message, "SUCCESS");
    },
    onSettled: () => {
      queryclient.invalidateQueries({ queryKey: ["get-comments"] });
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

const replyComment = async (payload: IComment) => {
  const res = await axios.post("/comment/reply", payload, {
    headers: authHeader(),
  });

  console.log(res);
  return res.data;
};

export const useReplyComment = () => {
  return useMutation({
    mutationFn: (payload: IComment) => replyComment(payload),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
