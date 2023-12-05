import { useSearchParams } from "react-router-dom";
import { useAuthSlice } from "../../../store/client/authslice";
import { useEffect } from "react";
import UserProfile from "./components/user-profile";
import OtherProfile from "./components/other-profile";
import UserBlog from "./components/userblog";

const Profile = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const { auth } = useAuthSlice();

  useEffect(() => {
    if (auth?.user) {
      setSearchParams({ userId: auth.user._id ?? "" });
    }
  }, [auth, setSearchParams]);
  const params = searchparams.get("userId");

  return (
    <div>
      <div className=" flex gap-5 items-start my-5">
        {params === auth?.user?._id ? <UserProfile /> : <OtherProfile />}

        <UserBlog />
      </div>
    </div>
  );
};

export default Profile;
