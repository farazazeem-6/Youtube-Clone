import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchLater, removeFromWatchLater } from "../store/slices/watchLaterSlice";

const WatchLaterButton = ({ videoId, videoData }) => {
  const dispatch = useDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Check if video is in watch later list
  const isInWatchLater = useSelector(
    (state) => !!state.watchLater.watchLaterVideos[videoId]
  );

  const handleWatchLater = () => {
    if (!videoId) {
      console.error("Missing videoId");
      return;
    }

    if (isInWatchLater) {
      // Remove from watch later
      dispatch(removeFromWatchLater(videoId));
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } else {
      // Add to watch later
      if (!videoData) {
        console.error("Missing video data");
        return;
      }

      dispatch(
        addToWatchLater({
          videoId,
          videoData: {
            id: videoId,
            title: videoData.title,
            thumbnail: videoData.thumbnail,
            channelTitle: videoData.channelTitle,
            channelId: videoData.channelId,
            publishedAt: videoData.publishedAt,
            description: videoData.description,
          },
        })
      );
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleWatchLater}
        className={`bg-gray-200 px-3 py-2 rounded-3xl text-[12px] flex items-center gap-2 transition-all hover:bg-gray-300 ${
          isInWatchLater ? "bg-purple-100" : ""
        }`}
        title={isInWatchLater ? "Remove from Watch Later" : "Add to Watch Later"}
      >
        <i
          className={`text-lg transition-all ${
            isInWatchLater
              ? "ri-time-fill text-purple-600"
              : "ri-time-line text-gray-700"
          }`}
        ></i>
        <span className={isInWatchLater ? "text-purple-600 font-semibold" : ""}>
          {isInWatchLater ? "Saved" : "Save"}
        </span>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded whitespace-nowrap z-10">
          {isInWatchLater ? "Removed from Watch Later" : "Added to Watch Later"}
        </div>
      )}
    </div>
  );
};

export default WatchLaterButton;