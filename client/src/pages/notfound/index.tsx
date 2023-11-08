import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className=" mx-auto container h-screen flex justify-center items-center">
      <div className=" w-3/6 space-y-2 text-center">
        <h1 className=" text-xl font-bold ">
          404 <span className=" font-normal"> |</span> Not Found
        </h1>
        <p className=" opacity-75">Your content is not found in this page</p>
        <Link to={"/"} className=" btn btn-neutral btn-md btn-outline">
          go back
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
