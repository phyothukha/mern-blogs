import { useEffect } from "react";
import { useAlertSlice } from "../store/client/alertslice";

const ToastAlert = () => {
  const { show, setAlert, message, color } = useAlertSlice();

  useEffect(() => {
    setTimeout(() => {
      setAlert("", "", false);
    }, 3000);
    console.log(color);
  }, [setAlert, show, color]);

  return (
    <>
      {show && (
        <div className="toast">
          <div className={` alert alert-${color}`}>
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastAlert;
