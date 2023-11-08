import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import Layout from "./layout/Layout";
import UserList from "./pages/user-list";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import useCheckOnline from "./hooks/usecheckonline";
import { ToastAlert } from "./hooks/ToastAlert";
import Todo from "./pages/dashboard/todo";
import Notfound from "./pages/notfound";

const App = () => {
  const { showtoast } = useCheckOnline();
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
          path: "to-do",
          element: <Todo />,
        },
        {
          path: "users",
          element: <UserList />,
        },
      ],
    },

    {
      path: "login",
      element: <Login />,
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
      {showtoast && (
        <ToastAlert message="you are currently offline" color="error" />
      )}
    </div>
  );
};

export default App;
