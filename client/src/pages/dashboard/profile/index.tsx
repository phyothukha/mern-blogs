import { useSearchParams } from "react-router-dom";
import { useAuthSlice } from "../../../store/client/authslice";
import { useEffect } from "react";
import UserProfile from "./components/user-profile";
import OtherProfile from "./components/other-profile";
import UserBlog from "./components/userblog";

const Profile = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const { auth } = useAuthSlice();
  const params = searchparams.get("userId");

  useEffect(() => {
    if (!params) {
      setSearchParams({ userId: auth?.user?._id ?? "" });
    }
  }, [setSearchParams, params, auth?.user?._id]);

  return (
    <div>
      <div className=" flex gap-5 items-start my-5">
        <div className=" sticky top-24">
          {params === auth?.user?._id ? <UserProfile /> : <OtherProfile />}
        </div>

        <UserBlog />
      </div>
    </div>
  );
};

export default Profile;
