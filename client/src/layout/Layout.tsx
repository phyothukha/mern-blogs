import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" flex flex-col justify-between ">
      <Header />
      <main className=" flex-1 container mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
