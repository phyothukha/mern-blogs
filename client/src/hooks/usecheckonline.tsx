import { useEffect } from "react";
import UseNetWork from "./use-network";
import { useAlertSlice } from "../store/client/alertslice";

const useCheckOnline = () => {
  const { isOnline } = UseNetWork();
  const { setAlert } = useAlertSlice();

  useEffect(() => {
    if (!isOnline) {
      console.log("you are offline!");
      setAlert("you are currently offline 💥", "ERROR", true);
    } else {
      console.log("you are online");
      setAlert("back online 🛩️", "INFO");
    }
  }, [isOnline, setAlert]);
};

export default useCheckOnline;
