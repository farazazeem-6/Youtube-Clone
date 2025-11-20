import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import Wrapper from "../components/Wrapper";
import { useSelector } from "react-redux";

const Body = () => {
  const isSideBar = useSelector((state) => state.sidebar.isSidebarOpen);
  return (
    <Wrapper>
      <div className="mt-1">
        <div className="flex gap-1">
          {isSideBar && <Sidebar />}
          <MainContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Body;
