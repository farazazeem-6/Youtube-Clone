import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import Wrapper from "../components/Wrapper";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Body = () => {
  const isSideBar = useSelector((state) => state.sidebar.isSidebarOpen);
  return (
    <Wrapper>
      <div className="">
        <div className="flex gap-2">
          {isSideBar && <Sidebar />}
          <Outlet/>
        </div>
      </div>
    </Wrapper>
  );
};

export default Body;
