import { useEffect } from "react";
import UseNetWork from "./use-network";

const useCheckOnline = () => {
  const { isOnline } = UseNetWork();

  useEffect(() => {
    if (!isOnline) {
      // toast.error("not online");
    } else {
      // toast("hello online");
    }
  }, [isOnline]);
};

export default useCheckOnline;
