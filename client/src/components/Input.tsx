import { ChangeEvent, FC } from "react";

interface InputProps {
  type: string;
  color?: string;
  message: string;
  value: string;
  onChange: (value: string) => void;
  // onchangeEvent: ChangeEvent<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  type,
  color = "secondary",
  message,
  value,
  onChange,
}) => {
  const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <div>
      <label className="label">
        <span className="label-text text-secondary-content  capitalize">
          {message}
        </span>
      </label>
      <input
        // value={account}
        type={type}
        onChange={handleChangeEvent}
        name={value}
        placeholder={`Type your ${message}`}
        className={`input input-bordered text-primary  input-${color} w-full`}
      />
    </div>
  );
};

export default Input;
