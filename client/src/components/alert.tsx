import { useAlertSlice } from "../store/client/alertslice";
import {
  IconAlertTriangleFilled,
  IconInfoCircleFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";

const useToastAlert = () => {
  const { show, type, message } = useAlertSlice();
  // if (!show) return;
  if (show) {
    return (
      <div className="toast toast-top toast-center z-50">
        <div
          role="alert"
          className={` alert ${
            type === "ERROR"
              ? "alert-error"
              : type === "SUCCESS"
              ? "alert-success"
              : "alert-info"
          }`}
        >
          <div className=" text-3xl">
            {type === "ERROR" ? (
              <IconAlertTriangleFilled />
            ) : type === "SUCCESS" ? (
              <IconCircleCheckFilled />
            ) : (
              <IconInfoCircleFilled />
            )}
          </div>
          <span>{message}</span>
        </div>
      </div>
    );
  }
};

export default useToastAlert;
