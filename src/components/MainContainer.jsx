import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import Wrapper from "./Wrapper";

const MainContainer = () => {
  return (
    <Wrapper>
      <div>
        <ButtonList />
        <VideoContainer />
      </div>
    </Wrapper>
  );
};

export default MainContainer;
