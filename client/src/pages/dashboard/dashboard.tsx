import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetCategory } from "../../store/server/category/queries";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: CategoryData } = useGetCategory();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/blog");
    }
  }, [navigate, location]);

  return (
    <div className=" container h-screen">
      <div className="grid grid-cols-4 h-full gap-3">
        <div className=" col-span-1 bg-base-100 sticky">
          <aside>
            <div className=" flex flex-col transition-transform  ">
              <NavLink
                to={`/blog`}
                className={`${
                  location.pathname === "/blog"
                    ? " bg-primary text-secondary"
                    : " bg-base-200 "
                } p-3  shadow-md rounded-md m-2 font-bold transition duration-700 delay-75 `}
              >
                All
              </NavLink>

              {CategoryData?.map(({ name, _id }) => (
                <NavLink
                  key={_id}
                  to={`/blog-category/${_id}`}
                  className={({ isActive }) =>
                    `${
                      isActive ? " bg-primary text-secondary" : " bg-base-200 "
                    } p-3  shadow-md rounded-md m-2 font-bold transition duration-700 delay-75 `
                  }
                >
                  {name.toLowerCase()}
                </NavLink>
              ))}
            </div>
          </aside>
        </div>
        <div className=" col-span-2  h-screen overflow-y-scroll main-scroll">
          <div className="">
            <Outlet />
          </div>
        </div>
        <div className=" col-span-1 bg-base-100">
          <h1>hello left bar side</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
