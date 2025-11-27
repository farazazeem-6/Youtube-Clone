import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromHistory,
  clearAllHistory,
} from "../store/slices/historySlice";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const watchedVideos = useSelector((state) => state.history.watchedVideos);

  // Convert object to array and sort by watch time (most recent first)
  const videosList = Object.values(watchedVideos).sort(
    (a, b) => new Date(b.watchedAt) - new Date(a.watchedAt)
  );

  const handleRemoveVideo = (videoId, e) => {
    e.preventDefault(); // Prevent navigation when clicking delete
    dispatch(removeFromHistory(videoId));
  };

  const handleClearAll = () => {
    dispatch(clearAllHistory());
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const watched = new Date(date);
    const diffInSeconds = Math.floor((now - watched) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return watched.toLocaleDateString();
  };

  if (videosList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center w-full">
        <i className="ri-history-line text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No watch history yet
        </h2>
        <p className="text-gray-500">Videos you watch will appear here!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Watch History ({videosList.length})
        </h1>
        <button
          onClick={handleClearAll}
          className=" text-gray-600 px-4 py-2 rounded-lg text-[12px] hover:transition-colors flex items-center gap-2 cursor-pointer"
        >
          <i className="ri-delete-bin-line"></i>
          Clear All History
        </button>
      </div>

      <div className="space-y-4">
        {videosList.map((video) => (
          <Link
            key={video.id}
            to={`/watch?v=${video.id}`}
            className="flex gap-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 group"
          >
            {/* Thumbnail */}
            <div className="relative shrink-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-48 h-28 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                <i className="ri-play-circle-line text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{video.channelTitle}</p>
              <p className="text-xs text-gray-500">
                Watched {formatTimeAgo(video.watchedAt)}
              </p>
              {video.description && (
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => handleRemoveVideo(video.id, e)}
              className="shrink-0 text-gray-400 hover:text-gray-300 transition-colors p-2"
              title="Remove from history"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
