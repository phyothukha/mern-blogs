import { useLocation, useSearchParams } from "react-router-dom";
import { useAuthSlice } from "../../../store/client/authslice";
import { useEffect } from "react";
import UserProfile from "./components/user-profile";
import OtherProfile from "./components/other-profile";
import UserBlog from "./components/userblog";

const Profile = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const { auth } = useAuthSlice();
  const params = searchparams.get("userId");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      if (!params) {
        setSearchParams({ userId: auth?.user?._id ?? "" });
      }
    }
  }, [setSearchParams, params, auth?.user?._id, location]);

  return (
    <div className=" md:grid md:grid-cols-3 space-y-5 px-3 gap-5 items-start my-5">
      <div className=" md:sticky top-24 col-span-1">
        {params === auth?.user?._id ? <UserProfile /> : <OtherProfile />}
      </div>
      <div className=" col-span-2">
        <UserBlog />
      </div>
    </div>
  );
};

export default Profile;
