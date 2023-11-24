import { useRefreshtoken } from "../../store/server/auth/queries";

const Dashboard = () => {
  const { data } = useRefreshtoken();
  console.log(data);

  return (
    <div>
      <h1>Hello Dashboard</h1>

      <button className=" btn btn-success">Click</button>
    </div>
  );
};

export default Dashboard;
