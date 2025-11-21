// src/hooks/useFetchSearchResults.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchResults, setLoading } from "../store/slices/searchSlice";
import { API_KEY } from "../utils/constants";

const useFetchSearchResults = (searchQuery) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchQuery) return; // Don't fetch if empty

    const fetchSearchResults = async () => {
      dispatch(setLoading(true));

      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${API_KEY}`
        );

        const data = await response.json();
        console.log(data.items);
        

        dispatch(setSearchResults(data.items || []));
      } catch (error) {
        console.error("Search API Error:", error);
        dispatch(setSearchResults([]));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSearchResults();
  }, [searchQuery, dispatch]);
};

export default useFetchSearchResults;
