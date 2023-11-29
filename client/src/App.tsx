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
import UserProfile from "./pages/dashboard/profile";
import useCheckOnline from "./hooks/usecheckonline";
import SmsVerify from "./pages/auth/sms-verify";

const App = () => {
  useCheckOnline();
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
          element: <UserProfile />,
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
