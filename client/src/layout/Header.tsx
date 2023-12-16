import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthSlice } from "../store/client/authslice";
import { logout } from "../store/server/auth/queries";
import { useAlertSlice } from "../store/client/alertslice";

const Header = () => {
  const [show, setShow] = useState(false);
  const { auth, setAuth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    setAuth(null);

    setAlert(response.message, "INFO");
  };
  useEffect(() => {
    if (!auth?.access_token) {
      navigate("/login");
    }
  }, [auth?.access_token, navigate]);

  const path = [
    { nav: "Profile", path: "/profile" },
    { nav: "Create-Blog", path: "/create-blog" },
  ];

  return (
    <header className="navbar bg-secondary shadow-md sticky top-0 z-40">
      <nav className=" container flex justify-between mx-auto absolute left-0 right-0 py-4">
        <div>
          <Link
            to={"blog"}
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

          <div className="dropdown dropdown-end">
            {auth?.user && (
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={auth?.user.avatar as string} alt="avatar" />
                </div>
              </label>
            )}
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

              {auth?.user?.role === "admin" && (
                <li>
                  <Link to={"/category"} className="justify-between p-2">
                    Category
                  </Link>
                </li>
              )}
              <div className="divider my-0" />
              <li>
                <button onClick={handleLogout} className=" p-2">
                  Logout
                </button>
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
          <div className=" flex lg:hidden flex-col absolute bg-secondary top-20 p-5 w-full transform translate-x-[50%] -left-[50%] z-10">
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
              {auth?.user?.role === "admin" && (
                <li>
                  <Link to={"/category"} className="justify-between p-2">
                    Category
                  </Link>
                </li>
              )}
              <div className="divider my-0" />
              <li className=" cursor-pointer">
                <button className=" p-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
