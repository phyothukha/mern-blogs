import { FC } from "react";
import { Link } from "react-router-dom";
import { PathType } from "../Header";
import { useAuthSlice } from "../../store/client/authslice";

interface headerProps {
  path: PathType;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

const MobileHeader: FC<headerProps> = ({
  path,
  show,
  setShow,
  handleLogout,
}) => {
  const { auth } = useAuthSlice();
  return (
    <div className=" flex lg:hidden flex-col absolute bg-secondary top-20 p-5 w-full transform translate-x-[50%] -left-[50%] z-10">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered"
        />
      </div>
      <ul tabIndex={0} className=" my-2">
        {path.map(({ nav, path }) => (
          <li
            key={nav}
            className=" items-center "
            onClick={() => setShow(!show)}
          >
            <Link
              to={path}
              className="justify-between hover:bg-secondary-focus transition duration-300 rounded-md p-2 block text-primary"
            >
              {nav}
            </Link>
          </li>
        ))}
        {auth?.user?.role === "admin" && (
          <li onClick={() => setShow(!show)} className=" items-center">
            <Link
              to={"/category"}
              className="justify-between p-2 hover:bg-secondary-focus rounded-md transition duration-300 block text-primary"
            >
              Category
            </Link>
          </li>
        )}
        <div className="divider my-0" />
        <li className=" cursor-pointer">
          <span
            className=" p-2 text-primary block hover:bg-secondary-focus rounded-md transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MobileHeader;
