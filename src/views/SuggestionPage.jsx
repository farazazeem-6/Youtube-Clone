import { useSelector } from "react-redux";
import SuggestionCard from "../components/SuggestionCard";
import ButtonList from "../views/ButtonList";
import { Link } from "react-router-dom";
import SuggestionCardShimmer from "../components/SuggestionCardShimmer";

const SuggestionPage = () => {
  const movies = useSelector((state) => state.movies.popularMovies);
  if (!movies) {
    return (
      <div className="p-4 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Loading suggestions...</h2>
        {[...Array(5)].map((_, index) => (
          <SuggestionCardShimmer key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <ButtonList />
      <div className="flex flex-col gap-1">
        {movies.map((movie, index) => (
          <Link to={"/watch?v=" + movie.id}>
            <SuggestionCard key={index} info={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestionPage;
