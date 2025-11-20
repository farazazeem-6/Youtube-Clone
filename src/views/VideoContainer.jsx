import { useSelector } from "react-redux";
import useFetchPopularVideos from "../hooks/useFetchPopularVideos";
import VideoCard from "../components/VideoCard";

const VideoContainer = () => {
  const movies = useSelector((state) => state.movies.popularMovies);
  useFetchPopularVideos();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {movies.map((movie) => (
        <VideoCard info={movie ? movie : null} />
      ))}
    </div>
  );
};

export default VideoContainer;
