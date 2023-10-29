import React from "react";

interface toastprops {
  message: string;
  color: string;
  position?: string;
}

export const ToastAlert: React.FC<toastprops> = ({
  message,
  color,
  position = "end",
}) => {
  return (
    <div className={`toast toast-top toast-${position}`}>
      <div className={` alert alert-${color}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};
