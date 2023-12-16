import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IconCamera } from "@tabler/icons-react";
import { useAuthSlice } from "../../../../store/client/authslice";
import {
  useResetPassword,
  useUpdateuser,
} from "../../../../store/server/profileuser/mutation";
import { uploadImage } from "../../../../utils/imageupload";
import { checkPassword } from "../../../../utils/valid";
import { useAlertSlice } from "../../../../store/client/alertslice";

interface userType {
  name: string;
  account: string;
  avatar: File | string;
  password: string;
  confirmpassword: string;
}

const UserProfile = () => {
  const [image, setImage] = useState<File | string>("");
  const [loading, setLoding] = useState(false);
  const [user, setUser] = useState<userType>({
    name: "",
    account: "",
    avatar: "",
    password: "",
    confirmpassword: "",
  });
  const { auth } = useAuthSlice();
  const { setAlert } = useAlertSlice();
  const updateUser = useUpdateuser();
  const resetPassword = useResetPassword();

  useEffect(() => {
    if (auth?.user && user.avatar === "") {
      setUser({
        name: auth.user.name,
        account: auth.user.account ?? "",
        avatar: auth.user.avatar ?? "",
        password: auth.user.password ?? "",
        confirmpassword: "",
      });
    }
  }, [auth?.user, user.avatar]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handlChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    files && setImage(files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoding(true);
    if (user.password) {
      const message = checkPassword(user.password, user.confirmpassword);
      if (message) {
        setAlert(message, "ERROR");
      }

      if (!checkPassword(user.password, user.confirmpassword)) {
        resetPassword.mutate(user.password);
      }
    } else if (user.name || user.avatar) {
      if (image) {
        uploadImage(image as File)
          .then((res) =>
            updateUser.mutate({
              name: user.name,
              avatar: res.secureUrl,
            })
          )
          .then(() => setLoding(false));
      } else {
        updateUser.mutate({ name: user.name, avatar: user.avatar });
        setLoding(false);
      }
    }
    setLoding(false);
  };

  return (
    <div className=" border rounded-md p-5">
      <form action="" onSubmit={handleSubmit} id="profile-update">
        <div className=" flex flex-col gap-5 items-center">
          <div className="relative group rounded-full w-40 h-40 cursor-pointer overflow-hidden">
            <img
              src={
                (image
                  ? URL.createObjectURL(image as File)
                  : user.avatar) as string
              }
              alt=""
              className=" hover:scale-105 w-full h-full transition-transform duration-300 object-fill  absolute z-0"
            />

            <div className=" absolute bottom-0 gap-2 translate-y-16 group-hover:transition-all duration-500 group-hover:translate-y-0 ease-in h-1/3 bg-opacity-40  bg-black flex justify-center w-full items-center flex-col">
              <input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={handlChangeFile}
              />
              <label htmlFor="file-upload" className=" cursor-pointer">
                <IconCamera className=" text-primary font-bold" />
              </label>
            </div>
          </div>

          <input
            type="text"
            defaultValue={auth?.user?.account}
            onChange={handleChange}
            name="account"
            placeholder="Type your email!(yor real email!)"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="text"
            name="name"
            defaultValue={auth?.user?.name}
            onChange={handleChange}
            placeholder="Type your name!"
            className="input input-bordered input-primary w-full max-w-xs"
          />

          {auth?.user?.type !== "register" && (
            <small className=" text-error">
              user cannot change your password in{` ${auth?.user?.type}`} type!,
            </small>
          )}
          <input
            type="password"
            name="password"
            defaultValue={auth?.user?.password}
            onChange={handleChange}
            placeholder="Type your password!"
            className="input input-bordered input-primary w-full max-w-xs"
            disabled={auth?.user?.type !== "register"}
          />
          <input
            type="password"
            name="confirmpassword"
            onChange={handleChange}
            placeholder="Type your confirm password!"
            className="input input-bordered input-primary w-full max-w-xs"
            disabled={auth?.user?.type !== "register"}
          />
          <button
            type="submit"
            className=" btn btn-primary w-80"
            form="profile-update"
          >
            {(updateUser.isPending || loading) && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
