import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className=" mx-auto container h-screen flex justify-center items-center">
      <div className=" w-3/6 space-y-2 text-center">
        <h1 className=" text-xl font-bold ">
          404 <span className=" font-normal"> |</span> Not Found
        </h1>
        <p className=" opacity-75">Your content is not found in this page</p>
        <button
          onClick={() => navigate(-1)}
          className=" btn btn-neutral btn-md btn-outline"
        >
          go back
        </button>
      </div>
    </div>
  );
};

export default Notfound;
