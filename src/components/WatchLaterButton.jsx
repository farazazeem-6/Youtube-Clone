import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../store/slices/watchLaterSlice";
import AuthenticationModal from "./AuthenticationModal";
import { SAVE_IMAGE, SAVE_IMAGE2 } from "../utils/constants";

const WatchLaterButton = ({ videoId, videoData }) => {
  const dispatch = useDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const isUser = useSelector((state) => state.user);

  // Check if video is in watch later list
  const isInWatchLater = useSelector(
    (state) => !!state.watchLater.watchLaterVideos[videoId]
  );

  const handleWatchLater = () => {
    if (isUser) {
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
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleWatchLater}
          className={`bg-gray-200 px-3 py-2 cursor-pointer rounded-full text-[12px] flex items-center gap-2  transition-all hover:bg-gray-300 ${
            isInWatchLater ? "bg-purple-100" : ""
          }`}
          title={
            isInWatchLater ? "Remove from Watch Later" : "Add to Watch Later"
          }
        >
          {isInWatchLater ? (
            <img className="w-5" src={SAVE_IMAGE2} alt="" />
          ) : (
            <img className="w-5" src={SAVE_IMAGE} alt="" />
          )}
          <span className={isInWatchLater ?  "font-bold" : ""}>
            {isInWatchLater ? "Saved" : "Save"}
          </span>
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded whitespace-nowrap z-10">
            {isInWatchLater
              ? "Removed from Watch Later"
              : "Added to Watch Later"}
          </div>
        )}
      </div>
      <AuthenticationModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default WatchLaterButton;
