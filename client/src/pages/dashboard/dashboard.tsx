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
    <div className=" container md:h-screen">
      <div className=" md:grid md:grid-cols-3 h-full gap-3">
        <div className="  col-span-1  bg-base-100">
          <aside className=" flex md:flex-col flex-wrap justify-center transition-transform mt-3">
            {CategoryData?.map(({ name, _id }) => (
              <NavLink
                key={_id}
                to={`/blog-category/${_id}`}
                className={({ isActive }) =>
                  `${
                    isActive ? " bg-info text-secondary" : " bg-base-200 "
                  } text-center md:text-start p-3 rounded-md m-2 font-bold transition  duration-500 ease-in-out`
                }
              >
                {name.toLowerCase()}
              </NavLink>
            ))}
          </aside>
        </div>
        <div className=" col-span-2  md:h-screen md:overflow-y-scroll main-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
