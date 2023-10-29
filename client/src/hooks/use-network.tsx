import { useEffect, useState } from "react";

const UseNetWork = () => {
  const [isOnline, setIsOnLine] = useState(navigator.onLine);

  useEffect(() => {
    const onlineHandler = () => {
      setIsOnLine(true);
    };
    const offlineHandler = () => {
      setIsOnLine(false);
    };

    return () => {
      window.addEventListener("online", onlineHandler);

      window.addEventListener("offline", offlineHandler);
    };
  }, []);

  return { isOnline };
};

export default UseNetWork;
