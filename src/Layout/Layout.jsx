import Header from "../views/Header";
import Sidebar from "../views/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header /> {/* Always visible */}
      <div className="flex flex-1">
        <Sidebar /> {/* Always visible */}
        <div className="flex-1">
          <Outlet /> {/* Only this part changes with route */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
