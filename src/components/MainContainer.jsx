import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import Sidebar from "./Sidebar";
import Wrapper from "./Wrapper";

const MainContainer = () => {
  return (
    <Wrapper>
      <div>
        <Sidebar />
        <VideoContainer />
      </div>
    </Wrapper>
  );
};

export default MainContainer;
