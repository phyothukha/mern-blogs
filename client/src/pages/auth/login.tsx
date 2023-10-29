import { Link } from "react-router-dom";
import Input from "../../components/Input";

const Login = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-96 p-5 rounded-md border-2 border-secondary space-y-3">
        <h1 className=" text-secondary font-bold text-2xl text-center capitalize">
          Login
        </h1>
        <form action="">
          <Input type="email" message="email" />
          <Input type="password" message="password" />
        </form>
        <button type="submit" className=" btn btn-secondary w-full">
          Login
        </button>

        <p>
          Don't you have an account yet! Register
          <Link to={"/register"}>
            <span className=" text-info"> Here</span>
          </Link>
        </p>
      </div>

      <p></p>
    </div>
  );
};

export default Login;
