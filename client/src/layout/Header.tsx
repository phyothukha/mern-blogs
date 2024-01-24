import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAuthSlice } from "../store/client/authslice";
import { logout } from "../store/server/auth/queries";
import { useAlertSlice } from "../store/client/alertslice";
import MobileHeader from "./components/mobileHeader";

export type PathType = { nav: string; path: string }[];
const Header = () => {
  const [show, setShow] = useState(false);
  const { auth, setAuth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = async () => {
    const response = await logout();
    setAuth(null);

    if (searchParams.has("userId")) {
      searchParams.delete("userId");
      setSearchParams(searchParams);
    }

    setAlert(response.message, "INFO");
  };

  const path: PathType = [
    { nav: "Profile", path: "/profile" },
    { nav: "Create-Blog", path: "/create-blog" },
  ];

  return (
    <header className="navbar bg-secondary shadow-md sticky top-0 z-40">
      <nav className=" container flex justify-between mx-auto relative">
        <div>
          <Link to={"blog"}>
            <h1 className=" normal-case text-primary font-bold text-xl">
              Phyrous Blog
            </h1>
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
          {auth?.user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={auth?.user.avatar as string} alt="avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-md  dropdown-content bg-secondary rounded-md w-52"
              >
                {path.map(({ nav, path }) => (
                  <li key={nav}>
                    <Link
                      to={path}
                      className="justify-between transition duration-300 hover:bg-secondary-focus rounded-md block p-2 text-primary"
                    >
                      {nav}
                    </Link>
                  </li>
                ))}
                {auth?.user?.role === "admin" && (
                  <li>
                    <Link
                      to={"/category"}
                      className="justify-between transition  duration-300 hover:bg-secondary-focus rounded-md block p-2 text-primary"
                    >
                      Category
                    </Link>
                  </li>
                )}
                <div className="divider my-0" />
                <li>
                  <span
                    onClick={handleLogout}
                    className=" text-primary transition duration-300 hover:bg-secondary-focus rounded-md block p-2 justify-between"
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className=" btn btn-primary btn-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
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
          <MobileHeader
            path={path}
            show={show}
            setShow={setShow}
            handleLogout={handleLogout}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
