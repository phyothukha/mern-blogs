import { FC } from "react";

interface InputProps {
  type: string;
  color?: string;
  message: string;
}

const Input: FC<InputProps> = ({ type, color = "secondary", message }) => {
  return (
    <div>
      <label className="label">
        <span className="label-text text-secondary-content capitalize">
          {message}
        </span>
      </label>
      <input
        type={type}
        placeholder={`Type your ${message}`}
        className={`input input-bordered text-primary  input-${color} w-full`}
      />
    </div>
  );
};

export default Input;
