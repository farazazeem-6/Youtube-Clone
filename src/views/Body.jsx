import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import Wrapper from "../components/Wrapper";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  const isSideBar = useSelector((state) => state.sidebar.isSidebarOpen);
  const location = useLocation()
    const isWatchRoute = location.pathname === "/watch";

  return (
    <Wrapper>
      <div className="">
        <Header/>
        <div className="flex gap-2">
          {isSideBar && <Sidebar isWatchRoute={isWatchRoute} />}
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};

export default Body;
