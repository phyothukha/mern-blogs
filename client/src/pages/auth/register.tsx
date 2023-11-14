import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { IuserRegiser } from "../../store/server/auth/interface";
import { validateEmail, validatephone } from "../../utils/valid";

const Register = () => {
  const initialState = {
    name: "",
    account: "",
    password: "",
    confirmpassword: "",
  };
  const [register, setRegister] = useState(initialState);
  const [error, setError] = useState<Partial<IuserRegiser>>({});
  const { name, account, password, confirmpassword } = register;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError({ ...error, [name]: "" });
    setRegister({ ...register, [name]: value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const err=
    const validationErr: Partial<IuserRegiser> = {};
    if (!register.name) {
      validationErr.name = "Name is required";
    }
    if (!validateEmail(register.account) && !validatephone(register.account)) {
      validationErr.account = "your email or phone number  is not format";
    }

    if (!register.account) {
      validationErr.account = "Email is required";
    }

    if (!register.password) {
      validationErr.password = "password is required";
    }
    if (register.password !== register.confirmpassword) {
      validationErr.confirmpassword =
        "password and confirm-password is not match";
    }

    if (Object.keys(validationErr).length > 0) {
      setError(validationErr);
      return;
    }
  };

  const [type, setType] = useState(false);

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-96 p-5 rounded-md border-2 border-secondary space-y-3">
        <h1 className=" text-secondary font-bold text-2xl text-center capitalize">
          Register
        </h1>

        <form action="" id="register-submit" onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text text-secondary-content  capitalize">
              Username
            </span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Type your email or phone!"
            className={`input input-bordered text-primary  input-secondary w-full`}
          />
          {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

          <label className="label">
            <span className="label-text text-secondary-content  capitalize">
              Email/Phone number
            </span>
          </label>
          <input
            type="text"
            name="account"
            value={account}
            onChange={handleChange}
            placeholder="Type your email or phone!"
            className={`input input-bordered text-primary  input-secondary w-full`}
          />
          {error.account && (
            <p className="text-red-500 text-sm">{error.account}</p>
          )}

          <label className="label">
            <span className="label-text text-secondary-content  capitalize">
              Password
            </span>
          </label>
          <div className=" relative ">
            <input
              type={type ? "text" : "password"}
              onChange={handleChange}
              value={password}
              name={"password"}
              placeholder={"Type your password!"}
              className={`input input-bordered text-primary  input-secondary w-full`}
            />
            <p
              onClick={() => setType(!type)}
              className=" absolute right-2 top-3 cursor-pointer select-none "
            >
              {type ? "hide" : "show"}
            </p>
          </div>
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}
          <label className="label">
            <span className="label-text text-secondary-content  capitalize">
              Confirm Password
            </span>
          </label>
          <div className=" relative ">
            <input
              type={type ? "text" : "password"}
              onChange={handleChange}
              value={confirmpassword}
              name="confirmpassword"
              placeholder={"Type your confirm-password!"}
              className={`input input-bordered text-primary  input-secondary w-full`}
            />
            <p
              onClick={() => setType(!type)}
              className=" absolute right-2 top-3 cursor-pointer select-none "
            >
              {type ? "hide" : "show"}
            </p>
          </div>
          {error.confirmpassword && (
            <p className="text-red-500 text-sm">{error.confirmpassword}</p>
          )}
        </form>
        <button
          type="submit"
          className=" btn btn-secondary w-full"
          form="register-submit"
        >
          Register
        </button>
        <p>
          Already have an account! Login
          <Link to={"/login"}>
            <span className=" text-info"> Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
