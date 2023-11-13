import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const initialState = { name: "", account: "", password: "" };

  const [register, setRegister] = useState(initialState);

  const { name, account, password } = register;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const [type, setType] = useState(false);

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-96 p-5 rounded-md border-2 border-secondary space-y-3">
        <h1 className=" text-secondary font-bold text-2xl text-center capitalize">
          Register
        </h1>

        <form action="">
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
          <label className="label">
            <span className="label-text text-secondary-content  capitalize">
              Account
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
        </form>
        <button className=" btn btn-secondary w-full">Register</button>
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
