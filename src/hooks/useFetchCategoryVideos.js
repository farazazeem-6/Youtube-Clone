// useFetchCategoryVideos.js - UPDATED
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategoryMovies, setLoading, resetCategoryMovies, resetPopularMovies } from "../store/slices/moviesSlice";
import { API_KEY } from "../utils/constants";

const useFetchCategoryVideos = (category) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (category === "All") return;

    const fetchVideos = async () => {
      dispatch(resetCategoryMovies()); // ✅ Clear category
      dispatch(resetPopularMovies()); // ✅ Clear popular too
      dispatch(setLoading(true));

      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${category}&maxResults=25&key=${API_KEY}`
        );
        const data = await res.json();

        dispatch(
          setCategoryMovies({
            items: data.items || [],
            nextPageToken: data.nextPageToken,
          })
        );
      } catch (err) {
        console.error(err);
        dispatch(setCategoryMovies({ items: [], nextPageToken: null }));
      }

      dispatch(setLoading(false));
    };

    fetchVideos();
  }, [category, dispatch]);
};

export default useFetchCategoryVideos;