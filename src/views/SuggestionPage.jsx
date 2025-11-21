import { useSelector } from "react-redux";
import SuggestionCard from "../components/SuggestionCard";
import ButtonList from "../views/ButtonList";
import { Link } from "react-router-dom";

const SuggestionPage = () => {
  const movies = useSelector((state) => state.movies.popularMovies);
  if (!movies) return;

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
