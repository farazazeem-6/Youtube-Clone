import { useSelector } from "react-redux";
import useFetchPopularVideos from "../hooks/useFetchPopularVideos";
import useFetchNextPagePopularVideos from "../hooks/useFetchNextPagePopularVideos";
import useFetchCategoryVideos from "../hooks/useFetchCategoryVideos";
import useFetchNextPageCategoryVideos from "../hooks/useFetchNextPageCategoryVideos";
import VideoCard from "../components/VideoCard";
import VideoCardShimmer from "../components/VideoCardShimmer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const category = useSelector((state) => state.filter.category);
  const movies = useSelector((state) => state.movies.popularMovies);
  const categoryMovies = useSelector((state) => state.movies.categoryMovies);
  const categoryNextPageToken = useSelector(
    (state) => state.movies.categoryNextPageToken
  );
  const popularNextPageToken = useSelector(
    (state) => state.movies.popularNextPageToken
  );
  const isLoading = useSelector((state) => state.movies.isLoading);

  const fetchMorePopularVideos = useFetchNextPagePopularVideos();
  const fetchMoreCategoryVideos = useFetchNextPageCategoryVideos();

  //  Only call the hook for the active category
  useFetchPopularVideos(category);
  useFetchCategoryVideos(category);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        if (category === "All") {
          if (popularNextPageToken) {
            fetchMorePopularVideos(popularNextPageToken);
          }
        } else {
          if (categoryNextPageToken) {
            fetchMoreCategoryVideos(categoryNextPageToken, category);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [category, popularNextPageToken, categoryNextPageToken, fetchMorePopularVideos, fetchMoreCategoryVideos]);

  // Choose correct list to show
  const finalList = category === "All" ? movies : categoryMovies;

  // Shimmer on first load
  if (isLoading && finalList.length === 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <VideoCardShimmer key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {finalList.map((movie) => (
        <Link key={movie.id?.videoId || movie.id} to={"/watch?v=" + (movie.id?.videoId || movie.id)}>
          <VideoCard info={movie} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;