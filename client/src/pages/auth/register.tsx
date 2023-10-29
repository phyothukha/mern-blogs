import { Link } from "react-router-dom";
import Input from "../../components/Input";

const Register = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-96 p-5 rounded-md border-2 border-secondary space-y-3">
        <h1 className=" text-secondary font-bold text-2xl text-center capitalize">
          Register
        </h1>

        <Input type="text" message="username" />
        <Input type="email" message="email" />
        <Input type="password" message="password" />
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
