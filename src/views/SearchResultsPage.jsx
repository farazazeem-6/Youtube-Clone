import { Link, useSearchParams } from "react-router-dom";
import useFetchSearchResults from "../hooks/useFetchSearchResults";
import { useSelector } from "react-redux";
import SearchResultCard from "../components/SearchResultCard";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  useFetchSearchResults(searchQuery);

  const searchResults = useSelector((state) => state.search.searchResults);
  searchResults ? console.log(searchResults) : console.log("Hyyy");

  const isLoading = useSelector((state) => state.search.isLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="p-8">
        <p className="text-xl">No results found for "{searchQuery}"</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 pl-6">
      {searchResults &&
        searchResults.map((item) => (
          <Link to={"/watch?v=" + item.id.videoId}>
            <SearchResultCard info={item} />
          </Link>
        ))}
    </div>
  );
};

export default SearchResultsPage;