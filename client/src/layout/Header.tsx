import { Link } from "react-router-dom";
import profile from "/profile-1.jpg";
import { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  const path = [
    { nav: "Profile", path: "/profile" },
    { nav: "Setting", path: "/setting" },
  ];

  return (
    <header className="navbar bg-secondary shadow-md ">
      <nav className=" container flex justify-between mx-auto absolute left-0 right-0 p-4">
        <div>
          <Link
            to={"/"}
            className=" normal-case text-primary font-bold text-xl"
          >
            Phyrous Blog
          </Link>
        </div>
        <div className="flex-none gap-2 lg:flex hidden">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>

          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profile} alt="" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-md menu menu-sm dropdown-content bg-secondary rounded-md w-52"
            >
              {path.map(({ nav, path }) => (
                <li key={nav}>
                  <Link to={path} className="justify-between p-2">
                    {nav}
                  </Link>
                </li>
              ))}
              <div className="divider my-0" />
              <li>
                <a className=" p-2">Logout</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className=" flex-none gap-2 cursor-pointer inline lg:hidden"
          onClick={() => setShow(!show)}
        >
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        {show && (
          <div className=" flex lg:hidden flex-col absolute bg-secondary top-20 p-5 w-full transform translate-x-[50%] -left-[50%]">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered"
              />
            </div>

            <ul tabIndex={0}>
              {path.map(({ nav, path }) => (
                <li key={nav} className=" items-center">
                  <Link to={path} className="justify-between p-2 block">
                    {nav}
                  </Link>
                </li>
              ))}
              <div className="divider my-0" />
              <li className=" cursor-pointer">
                <a className=" p-2">Logout</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
