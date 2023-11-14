import { useAlertSlice } from "../store/client/alertslice";

const useToastAlert = () => {
  const { show, type, message } = useAlertSlice();

  return (
    <>
      {show && (
        <div className="toast">
          <div
            className={` alert ${
              type === "ERROR"
                ? "alert-error"
                : type === "SUCCESS"
                ? "alert-success"
                : "alert-info"
            }`}
          >
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default useToastAlert;
