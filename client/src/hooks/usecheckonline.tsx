import { useEffect, useState } from "react";
import UseNetWork from "./use-network";

const useCheckOnline = () => {
  const { isOnline } = UseNetWork();
  const [showtoast, setShowtoast] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowtoast(true);
    } else {
      setShowtoast(false);
    }
  }, [isOnline]);

  return { showtoast };
};

export default useCheckOnline;
