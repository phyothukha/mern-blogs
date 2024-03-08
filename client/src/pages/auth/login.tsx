import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLogin, useLoginWithSms } from "../../store/server/auth/mutation";
import { validLogin, validatePhone } from "../../utils/valid";
import { useAuthSlice } from "../../store/client/authslice";
import SocialLogin from "./components/SocialLogin";
import { IuserLogin } from "../../store/server/interface";

const Login = () => {
  const initialState = { account: "", password: "" };
  const location = useLocation();
  const navigate = useNavigate();
  const loginSms = useLoginWithSms();
  const loginUser = useLogin();
  const [sms, setSms] = useState(false);
  const [login, setLogin] = useState(initialState);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<Partial<IuserLogin | null>>({});
  const [type, setType] = useState(false);
  const { account, password } = login;
  const { auth } = useAuthSlice();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setError({ ...error, [name]: "" });
    setLogin({ ...login, [name]: value });
  };

  const handleAccountSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErr = validLogin(login);

    if (Object.keys(validationErr).length > 0) {
      setError(validationErr);
      return;
    }
    loginUser.mutate(login);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setError({ ...error, [name]: "" });
    setPhone(value);
  };

  const handlePhoneSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const check = validatePhone(phone);
    if (!check) {
      setError({ phone: "your phone number is not format" });
    } else {
      setError(null);
      loginSms.mutate({ phone });
    }
  };

  useEffect(() => {
    if (auth?.access_token) {
      navigate(location.state ? location.state : "/");
    }
  }, [auth, navigate, location]);

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-96 p-5 rounded-md border-2 border-secondary space-y-3">
        <h1 className=" text-secondary font-bold text-2xl text-center capitalize">
          Login
        </h1>
        {sms ? (
          <form action="" onSubmit={handlePhoneSubmit} id="phone-submit">
            <label className="label">
              <span className="label-text text-secondary-content  capitalize">
                Phone
              </span>
            </label>
            <input
              value={phone}
              type="text"
              name="account"
              onChange={handlePhoneChange}
              placeholder="Type your email or phone!"
              className={`input input-bordered text-primary  ${
                error?.phone ? " input-error" : "input-secondary"
              } w-full`}
            />
            {error?.phone && (
              <p className=" text-error text-sm">{error.phone}</p>
            )}
          </form>
        ) : (
          <form onSubmit={handleAccountSubmit} id="account-submit">
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
              className={`input input-bordered text-primary ${
                error?.account ? " input-error" : "input-secondary"
              } w-full`}
            />
            {error?.account && (
              <p className=" text-error text-sm">{error?.account}</p>
            )}
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
                className={`input input-bordered text-primary ${
                  error?.password ? " input-error" : "input-secondary"
                } w-full`}
              />
              <p
                onClick={() => setType(!type)}
                className=" absolute right-2 top-3 cursor-pointer select-none "
              >
                {type ? "hide" : "show"}
              </p>
            </div>
            {error?.password && (
              <p className=" text-error text-sm">{error.password}</p>
            )}
          </form>
        )}
        <div className=" flex justify-between">
          <Link to={"/forgot-password"}>
            <p>Forgot Password</p>
          </Link>
          <small
            onClick={() => setSms(!sms)}
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
            {loginSms.isPending && (
              <span className="loading loading-spinner loading-xs" />
            )}
            Login
          </button>
        ) : (
          <button
            type="submit"
            form="account-submit"
            className=" btn btn-secondary w-full"
          >
            {loginUser.isPending && (
              <span className="loading loading-spinner loading-xs" />
            )}
            Login
          </button>
        )}
        <SocialLogin />
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
