import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import Wrapper from "./Wrapper";
import { useSelector } from "react-redux";

const Body = () => {
  const isSideBar = useSelector((state) => state.sidebar.isSidebarOpen);
  return (
    <Wrapper>
      <div className="mt-2">
        <div className="flex gap-8">
          {isSideBar && <Sidebar />}
          <MainContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Body;
