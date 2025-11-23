// useFetchNextPagePopularVideos.js
import { useDispatch } from "react-redux";
import { addPopularMovies, setLoading } from "../store/slices/moviesSlice";
import { API_KEY } from "../utils/constants";

const useFetchNextPagePopularVideos = () => {
  const dispatch = useDispatch();

  const fetchMorePopularVideos = async (nextPageToken) => {
    if (!nextPageToken) return;

    dispatch(setLoading(true));

    try {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=PK&pageToken=${nextPageToken}&key=${API_KEY}`
      );

      const data = await res.json();

      dispatch(
        addPopularMovies({
          items: data.items || [],
          nextPageToken: data.nextPageToken || null,
        })
      );
    } catch (err) {
      console.error(err);
    }

    dispatch(setLoading(false));
  };

  return fetchMorePopularVideos;
};

export default useFetchNextPagePopularVideos;