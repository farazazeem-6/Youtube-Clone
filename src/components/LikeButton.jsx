import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeVideo, unlikeVideo } from "../store/slices/likedSlice";
import { formatViews } from "../utils/constants";

const LikeButton = ({ videoId, videoData, likeCount }) => {
  const dispatch = useDispatch();
  
  // Check if user has liked this video
  const isLiked = useSelector(
    (state) => !!state.liked.likedVideos[videoId]
  );

  const handleLike = () => {
    if (!videoId) {
      console.error("Missing videoId");
      return;
    }

    if (isLiked) {
      // Unlike the video
      dispatch(unlikeVideo(videoId));
    } else {
      // Like the video - save video data
      if (!videoData) {
        console.error("Missing video data");
        return;
      }

      dispatch(
        likeVideo({
          videoId,
          videoData: {
            id: videoId,
            title: videoData.title,
            thumbnail: videoData.thumbnail,
            channelTitle: videoData.channelTitle,
            channelId: videoData.channelId,
            publishedAt: videoData.publishedAt,
            description: videoData.description,
            likeCount: likeCount,
          },
        })
      );
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`bg-gray-200 px-2 rounded-3xl text-[12px] flex items-center gap-2 transition-all ${
        isLiked ? "bg-blue-100" : "hover:bg-gray-300"
      }`}
    >
      <i
        className={`text-lg transition-all ${
          isLiked
            ? "ri-thumb-up-fill text-blue-600"
            : "ri-thumb-up-line text-gray-700"
        }`}
      ></i>
      <span className={isLiked ? "text-blue-600 font-semibold" : ""}>
        {likeCount ? formatViews(likeCount) : "Like"}
      </span>
    </button>
  );
};

export default LikeButton;