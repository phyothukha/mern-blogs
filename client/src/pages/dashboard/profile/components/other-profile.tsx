import { useSearchParams } from "react-router-dom";
import { useGetUser } from "../../../../store/server/profileuser/queries";
import Loader from "../../../../components/loader";

const OtherProfile = () => {
  const [searchparams] = useSearchParams();
  const params = searchparams.get("userId");
  const { data, isLoading } = useGetUser(params ?? "");

  if (isLoading) <Loader />;

  return (
    <div className=" border rounded-md p-5">
      <div className=" flex flex-col gap-5 items-center">
        <div className="relative group rounded-full w-40 h-40 cursor-pointer overflow-hidden">
          <img
            src={`${data?.avatar}`}
            alt={data?.name}
            className=" w-full h-full "
          />
        </div>
        <h3 className=" text-2xl font-bold text-secondary">{data?.name}</h3>
        <div className=" text-start space-y-4">
          <h1 className=" text-lg">
            <span className=" text-lg text-primary">user role: &nbsp;</span>

            {data?.role?.toUpperCase()}
          </h1>
          <h1>
            <span className=" text-lg text-primary">Phone/email: &nbsp;</span>
            {data?.account}
          </h1>
          <h1>
            <span className=" text-lg text-primary">Joined Date: &nbsp;</span>
            {new Date(data?.createdAt as string).toLocaleString()}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
