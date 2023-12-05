import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Layout from "./layout/Layout";
import UserList from "./pages/user-list";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Todo from "./pages/dashboard/todo";
import Notfound from "./pages/notfound";
import ActiveAccount from "./pages/auth/activeaccount";
import Setting from "./pages/dashboard/setting";
import useCheckOnline from "./hooks/usecheckonline";
import SmsVerify from "./pages/auth/sms-verify";
import Profile from "./pages/dashboard/profile";
import { useRefreshtoken } from "./store/server/auth/queries";

const App = () => {
  useCheckOnline();
  useRefreshtoken();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "to-do",
          element: <Todo />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "active",
      element: <ActiveAccount />,
    },

    {
      path: "login",
      element: <Login />,
    },
    {
      path: "sms-verify",
      element: <SmsVerify />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
