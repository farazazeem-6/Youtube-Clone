import { useEffect, useState } from "react";
import { SINGLE_VIDEO_DETAIL_API } from "../utils/constants";

function useFetchSingleVideoData(videoId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) return;

    const fetchSingleVideoData = async () => {
      try {
        setLoading(true);

        const res = await fetch(SINGLE_VIDEO_DETAIL_API(videoId));
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();

        const item = json?.items?.[0];

        // 👉 extract only what you want
        const cleanData = {
          videoId: item?.id,
          snippet: item?.snippet,
          statistics: item?.statistics,
        };

        setData(cleanData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleVideoData();
  }, [videoId]);

  return { data, loading, error };
}

export default useFetchSingleVideoData;
