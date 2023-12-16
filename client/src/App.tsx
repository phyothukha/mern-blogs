import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useAuthSlice } from "./store/client/authslice";
import { useRefreshtoken } from "./store/server/auth/queries";
import Dashboard from "./pages/dashboard/dashboard";
import Layout from "./layout/Layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Todo from "./pages/dashboard/Todo/todo";
import Notfound from "./pages/notfound";
import ActiveAccount from "./pages/auth/activeaccount";
import useCheckOnline from "./hooks/usecheckonline";
import SmsVerify from "./pages/auth/sms-verify";
import Profile from "./pages/dashboard/profile";
import Category from "./pages/dashboard/category";
import CreateBlog from "./pages/dashboard/create-blog";
import MainSide from "./pages/dashboard/blogpost/components/mainside";
import AllFile from "./pages/dashboard/blogpost/components/allfile";
import BlogDetail from "./pages/dashboard/blogpost/components/blog-deatail";

const App = () => {
  useCheckOnline();
  const { setAuth } = useAuthSlice();

  const { data, isSuccess } = useRefreshtoken();
  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data);
    }
  }, [setAuth, data, isSuccess]);

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
          path: "/",
          element: <Dashboard />,
          children: [
            {
              path: "/blog",
              element: <AllFile />,
            },

            {
              path: "/blog-category/:id",
              element: <MainSide />,
            },
            {
              path: "/blog-category/blog-detail/:id",
              element: <BlogDetail />,
            },
          ],
        },
        {
          path: "to-do",
          element: <Todo />,
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "create-blog",
          element: <CreateBlog />,
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
    { path: "/not-found", element: <Notfound /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
