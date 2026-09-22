import NavbarComponent from "../components/ui/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default MainLayout;
