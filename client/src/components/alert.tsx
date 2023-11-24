import { useAlertSlice } from "../store/client/alertslice";
import {
  IoIosWarning,
  IoMdInformationCircle,
  IoMdCheckmarkCircle,
} from "react-icons/io";
const useToastAlert = () => {
  const { show, type, message } = useAlertSlice();

  return (
    <>
      {show && (
        <div className="toast toast-top toast-center">
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
                <IoIosWarning />
              ) : type === "SUCCESS" ? (
                <IoMdCheckmarkCircle />
              ) : (
                <IoMdInformationCircle />
              )}
            </div>

            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default useToastAlert;
