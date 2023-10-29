// import  from "../hooks/useToast";
import useToast from "../hooks/useToast";
// import useCheckOnline from "../hooks/usecheckonline";
import { ToastAlert } from "../hooks/ToastAlert";

const Dashboard = () => {
  const { hadletoast, show } = useToast();

  return (
    <div>
      <h1>Hello Dashboard</h1>

      <button className=" btn btn-success" onClick={hadletoast}>
        Click
      </button>

      {show && (
        <ToastAlert message="you are good" color="warning" position="center" />
      )}
    </div>
  );
};

export default Dashboard;
