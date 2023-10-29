import { useState } from "react";
// import { ToastAlert } from "./ToastAlert";

const useToast = () => {
  const [show, setShow] = useState(false);

  const hadletoast = () => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearInterval(timer);
};
  //   return show && <ToastAlert message="you hello" color="warning" />;

  return { hadletoast, show };
};

export default useToast;
