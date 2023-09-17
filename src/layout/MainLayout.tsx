import { Outlet } from "react-router-dom";
import '../index.css'

const MainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
