import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLogin } from "../../store/server/auth/mutation";

const Login = () => {
  const initialState = { account: "", password: "" };
  const [login, setLogin] = useState(initialState);
  const [phone, setPhone] = useState("");
  const { account, password } = login;
  const [type, setType] = useState(false);
  const [sms, setsms] = useState(false);
  const loginuser = useLogin();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginuser.mutate(login);
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-96 p-5 rounded-md border-2 border-secondary space-y-3">
        <h1 className=" text-secondary font-bold text-2xl text-center capitalize">
          Login
        </h1>
        {sms ? (
          <form action="" onSubmit={handleSubmit} id="phone-submit">
            <label className="label">
              <span className="label-text text-secondary-content  capitalize">
                Phone
              </span>
            </label>
            <input
              value={phone}
              type="text"
              name="account"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Type your email or phone!"
              className={`input input-bordered text-primary  input-secondary w-full`}
            />
          </form>
        ) : (
          <form action="" onSubmit={handleSubmit} id="account-submit">
            <label className="label">
              <span className="label-text text-secondary-content  capitalize">
                Account
              </span>
            </label>
            <input
              value={account}
              type="text"
              name="account"
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
                value={password}
                type={type ? "text" : "password"}
                onChange={handleChange}
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
        )}
        <div className=" flex justify-between">
          <Link to={"/forgot-password"}>
            <p>Forgot Password</p>
          </Link>

          <small
            onClick={() => setsms(!sms)}
            className=" cursor-pointer select-none"
          >
            {sms ? "login with password" : "login with sms"}
          </small>
        </div>
        {sms ? (
          <button
            type="submit"
            className=" btn btn-secondary w-full"
            form="phone-submit"
          >
            Login
          </button>
        ) : (
          <button
            type="submit"
            form="account-submit"
            className=" btn btn-secondary w-full"
          >
            {/* {loading && (
              <span className="loading loading-ring loading-xs"></span>
            )} */}
            Login
          </button>
        )}

        <p>
          Don't you have an account yet! Register
          <Link to={"/register"}>
            <span className=" text-info"> Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
