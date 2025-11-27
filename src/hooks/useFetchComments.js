import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComments, setLoading } from "../store/slices/commentsSlice";
import { API_KEY } from "../utils/constants";

export function useComments(videoId) {
  const dispatch = useDispatch();
  const storedComments = useSelector((state) => state.comments.storeComments);
  const isLoading = useSelector((state) => state.comments.isLoading);

  useEffect(() => {
    if (!videoId) return;

    // If we already have comments for this video ID, do NOT fetch again
    if (storedComments && storedComments[videoId]) return;

    async function fetchComments() {
      try {
        dispatch(setLoading(true));

        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&maxResults=100&key=${API_KEY}`
        );
        const json = await res.json();

        if (!json.items) {
          dispatch(setLoading(false));
          return;
        }

        dispatch(
          addComments({
            videoId: videoId,
            data: json,
          })
        );

        dispatch(setLoading(false));
      } catch (err) {
        console.error("Error fetching comments:", err);
        dispatch(setLoading(false));
      }
    }

    fetchComments();
  }, [videoId, dispatch, storedComments]);

  return {
    comments: storedComments?.[videoId] || null,
    isLoading,
  };
}
