import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useAuthSlice } from "./store/client/authslice";
import { useRefreshtoken } from "./store/server/auth/queries";
import useCheckOnline from "./hooks/usecheckonline";
import Loader from "./components/loader";
import Layout from "./layout/Layout";

const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const Todo = lazy(() => import("./pages/dashboard/Todo/todo"));
const Notfound = lazy(() => import("./pages/notfound"));
const ActiveAccount = lazy(() => import("./pages/auth/activeaccount"));
const SmsVerify = lazy(() => import("./pages/auth/sms-verify"));
const Profile = lazy(() => import("./pages/dashboard/profile"));
const Category = lazy(() => import("./pages/dashboard/category"));
const CreateBlog = lazy(() => import("./pages/dashboard/create-blog"));
const BlogDetail = lazy(
  () => import("./pages/dashboard/blogpost/components/blog-deatail")
);
const MainSide = lazy(
  () => import("./pages/dashboard/blogpost/components/mainside")
);
const AllFile = lazy(() => import("./pages/dashboard/blogpost"));

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
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
