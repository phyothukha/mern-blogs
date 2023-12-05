import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { axios } from "../../store/server";
import { useAlertSlice } from "../../store/client/alertslice";
import { AxiosError } from "axios";

const ActiveAccount = () => {
  const [searchparams] = useSearchParams();
  const { setAlert } = useAlertSlice();
  const [message, setMessage] = useState("");

  const param = searchparams.get("active_token");

  const activeAccount = async (activeToken: string) => {
    const response = await axios.post("/active-account", { activeToken });
    return response;
  };
  useEffect(() => {
    if (param) {
      activeAccount(param)
        .then((res) => {
          setAlert(res.data.message);
          setMessage(res.data.message);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            setAlert(err.response?.data.message);
          }
        });
    }
  }, [param, setAlert]);

  return (
    <div className=" h-screen flex justify-center items-center">
      <h1>{message}</h1>
    </div>
  );
};

export default ActiveAccount;
