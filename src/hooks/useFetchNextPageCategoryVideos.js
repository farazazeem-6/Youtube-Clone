// useFetchNextPageCategoryVideos.js (you didn't include this but here's the fix)
import { useDispatch } from "react-redux";
import { addMoreCategoryMovies, setLoading } from "../store/slices/moviesSlice";
import { API_KEY } from "../utils/constants";

const useFetchNextPageCategoryVideos = () => {
  const dispatch = useDispatch();

  const fetchMoreCategoryVideos = async (nextPageToken, category) => {
    if (!nextPageToken || !category) return;

    dispatch(setLoading(true));

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${category}&maxResults=25&pageToken=${nextPageToken}&key=${API_KEY}`
      );

      const data = await res.json();

      dispatch(
        addMoreCategoryMovies({
          items: data.items || [],
          nextPageToken: data.nextPageToken || null,
        })
      );
    } catch (err) {
      console.error(err);
    }

    dispatch(setLoading(false));
  };

  return fetchMoreCategoryVideos;
};

export default useFetchNextPageCategoryVideos;