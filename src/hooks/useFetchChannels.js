import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChannelData } from "../store/slices/channelSlice";
import { API_KEY } from "../utils/constants";

export function useChannel(channelId) {
  const dispatch = useDispatch();
  const storedChannel = useSelector(
    (state) => state.channel.channels[channelId]
  );

  useEffect(() => {
    if (!channelId) return;

    // ❌ If we already have channel data, do NOT fetch again
    if (storedChannel) return;

    async function fetchChannel() {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
        );
        const json = await res.json();

        const item = json.items?.[0];
        if (!item) return;

        dispatch(
          addChannelData({
            id: item.id,
            snippet: item.snippet,
            statistics: item.statistics,
          })
        );
      } catch (err) {
        console.error("Error fetching channel:", err);
      }
    }

    fetchChannel();
  }, [channelId, dispatch, storedChannel]);
}
