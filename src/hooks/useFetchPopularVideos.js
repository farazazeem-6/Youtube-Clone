// useFetchPopularVideos.js - UPDATED
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies, setLoading, resetPopularMovies, resetCategoryMovies } from "../store/slices/moviesSlice";
import { API_KEY, YOUTUBE_POPULAR_VIDEOS_API } from "../utils/constants";

const useFetchPopularVideos = (category) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (category !== "All") return;

    const fetchPopularVideos = async () => {
      dispatch(resetPopularMovies()); // ✅ Clear popular
      dispatch(resetCategoryMovies()); // ✅ Clear category too
      dispatch(setLoading(true));

      try {
        const res = await fetch(YOUTUBE_POPULAR_VIDEOS_API + API_KEY);
        const data = await res.json();

        dispatch(
          addPopularMovies({
            items: data.items || [],
            nextPageToken: data.nextPageToken || null,
          })
        );
      } catch (err) {
        console.error(err);
        dispatch(addPopularMovies({ items: [], nextPageToken: null }));
      }

      dispatch(setLoading(false));
    };

    fetchPopularVideos();
  }, [category, dispatch]);

  return null;
};

export default useFetchPopularVideos;