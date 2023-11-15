import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { IuserRegiser } from "../../store/server/auth/interface";
import { valdRegister } from "../../utils/valid";
import { useRegister } from "../../store/server/auth/mutation";

const Register = () => {
  const initialState = {
    name: "",
    account: "",
    password: "",
    confirmpassword: "",
  };
  const [register, setRegister] = useState(initialState);
  const [error, setError] = useState<Partial<IuserRegiser>>({});
  const registeruser = useRegister();
  const { name, account, password, confirmpassword } = register;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError({ ...error, [name]: "" });
    setRegister({ ...register, [name]: value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErr = valdRegister(register);

    if (Object.keys(validationErr).length > 0) {
      setError(validationErr);
      return;
    }
    registeruser.mutate(register);
    console.log(register);
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
            placeholder="kyaw kyaw"
            className={`input input-bordered text-primary placeholder:opacity-30  input-secondary w-full`}
          />
          {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

          <label className="label">
            <span className="label-text text-secondary-content  capitalize">
              Email/Phone number
            </span>
          </label>
          <input
            type="email"
            name="account"
            value={account}
            onChange={handleChange}
            placeholder="eg@gmail.com/09123456789"
            className={`input input-bordered text-primary placeholder:opacity-30  input-secondary w-full`}
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
              className={`input placeholder:opacity-30 input-bordered text-primary  input-secondary w-full`}
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
              className={`input placeholder:opacity-30 input-bordered text-primary  input-secondary w-full`}
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
