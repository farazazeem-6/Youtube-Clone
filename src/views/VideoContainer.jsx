import { useSelector } from "react-redux";
import useFetchPopularVideos from "../hooks/useFetchPopularVideos";
import VideoCard from "../components/VideoCard";
import useFetchNextPagePopularVideos from "../hooks/useFetchNextPagePopularVideos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const fetchMorePopularVideos = useFetchNextPagePopularVideos();
  const nextPageToken = useSelector((state) => state.movies.nextPageToken);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        fetchMorePopularVideos(nextPageToken);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken]);

  const movies = useSelector((state) => state.movies.popularMovies);
  // console.log(movies[0]);
  
  useFetchPopularVideos();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {movies.map((movie) => (
        <Link key={movie.id} to={"/watch?v=" + movie.id}>
          <VideoCard info={movie ? movie : null} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
