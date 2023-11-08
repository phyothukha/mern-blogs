import { Link } from "react-router-dom";
import profile from "/profile-1.jpg";

const Header = () => {
  const path = [
    { nav: "Profile", path: "/profile" },
    { nav: "Setting", path: "/setting" },
  ];

  return (
    <div className="navbar bg-secondary shadow-md ">
      <div className=" container flex justify-between mx-auto absolute left-0 right-0 p-4">
        <div>
          <Link
            to={"/"}
            className=" normal-case text-primary font-bold text-xl"
          >
            Phyrous Blog
          </Link>
        </div>
        <div className="flex-none gap-2 flex">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
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
      </div>
    </div>
  );
};

export default Header;
